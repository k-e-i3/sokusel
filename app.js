// Google Drive Client Logic (Consolidated for local compatibility)
const CLIENT_ID = '221098146252-psmtjk7chc54n35tpp4jgr3sgbipsemn.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const FOLDER_NAME = 'sokusel';
const DATA_FILE_NAME = 'questions.json';

class DriveClient {
    constructor(onStatusChange) {
        this.accessToken = null;
        this.tokenClient = null;
        this.folderId = null;
        this.fileId = null;
        this.onStatusChange = onStatusChange || console.log;
    }

    async init() {
        try {
            await this.waitForGoogleLibs();

            window.gapi.load('client', async () => {
                try {
                    await window.gapi.client.init({});
                    await window.gapi.client.load('drive', 'v3');
                    this.onStatusChange("Google連携準備完了");
                } catch (e) { console.error("GAPI Error", e); }
            });

            this.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID, scope: SCOPES,
                callback: (resp) => this.handleAuthResponse(resp),
            });

            this.onStatusChange("準備OK");
        } catch (err) {
            console.error("System Init Error:", err);
            this.onStatusChange("オフライン");
        }
    }

    waitForGoogleLibs() {
        return new Promise((resolve, reject) => {
            let count = 0;
            const check = () => {
                if (window.gapi && window.google && window.google.accounts) {
                    resolve();
                } else if (count > 50) {
                    reject(new Error("Timeout loading libs"));
                } else {
                    count++;
                    setTimeout(check, 200);
                }
            };
            check();
        });
    }

    login() {
        if (this.tokenClient) {
            this.tokenClient.requestAccessToken();
        }
    }

    handleAuthResponse(r) {
        if (r.error) {
            this.onStatusChange("認証エラー: " + r.error);
            return;
        }
        this.accessToken = r.access_token;
        this.onStatusChange("認証成功");
        this.initDriveResources();
    }

    async initDriveResources() {
        try {
            // 1. Find or Create Folder
            this.onStatusChange("フォルダを確認中...");
            const qFolder = `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
            const resFolder = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFolder)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFolder = await resFolder.json();

            if (dataFolder.files?.length > 0) {
                this.folderId = dataFolder.files[0].id;
            } else {
                this.onStatusChange("フォルダを作成中...");
                const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' })
                });
                const folder = await createRes.json();
                this.folderId = folder.id;
            }

            // 2. Find File (Initial Check for questions.json)
            await this.checkFile(DATA_FILE_NAME, window.questions || []);

            // Check for stats.json
            await this.checkFile('stats.json', { totalAnswers: 0, totalCorrect: 0, lastPlayed: '-', genreStats: {} });

        } catch (e) {
            console.error("Drive resource init error", e);
            this.onStatusChange("初期化エラー");
        }
    }

    async checkFile(fileName, defaultContent) {
        const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
        const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        const dataFile = await resFile.json();

        if (dataFile.files?.length === 0) {
            this.onStatusChange(`${fileName}を作成中...`);
            await this.saveData(fileName, defaultContent);
        } else {
            // We don't necessarily load everything here, app.js will request what it needs
            this.onStatusChange(`${fileName}を確認`);
        }
    }

    async loadData(fileName) {
        if (!this.folderId || !this.accessToken) return null;
        try {
            // Find file ID again to be sure (or cache it)
            const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
            const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFile = await resFile.json();

            if (dataFile.files?.length > 0) {
                const fileId = dataFile.files[0].id;
                const contentRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                });
                return await contentRes.json();
            }
            return null;
        } catch (e) {
            console.error(`Load error ${fileName}`, e);
            return null;
        }
    }

    async saveData(fileName, data) {
        if (!this.accessToken || !this.folderId) return;

        const content = JSON.stringify(data, null, 2);

        try {
            this.onStatusChange(`${fileName}を保存中...`);

            // Find file ID
            const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
            const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFile = await resFile.json();

            if (dataFile.files?.length > 0) {
                const fileId = dataFile.files[0].id;
                await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
                    method: 'PATCH',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' },
                    body: content
                });
            } else {
                // Create
                const metadata = { name: fileName, parents: [this.folderId] };
                const boundary = '-------314159265358979323846';
                const body = `--${boundary}\nContent-Type: application/json; charset=UTF-8\n\n${JSON.stringify(metadata)}\n--${boundary}\nContent-Type: application/json\n\n${content}\n--${boundary}--`;

                await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
                    body: body
                });
            }
            this.onStatusChange("保存完了");
        } catch (e) {
            console.error("Save error", e);
            this.onStatusChange("保存失敗");
        }
    }
}

// --- Global State ---
let questionsData = window.questions || []; // Default to local if available
let currentQIndex = 0;
let score = 0;
let currentSegments = [];
let activeSegmentIndex = null;
let isChecked = false;

// Statistics State
let statistics = JSON.parse(localStorage.getItem('sokusel_stats')) || {
    totalAnswers: 0,
    totalCorrect: 0,
    lastPlayed: '-',
    genreStats: {}
};

// V2 Game State
let filteredQuestions = [];
let sessionGenreScores = {};
let selectedGenre = 'all';
let selectedCount = 10;

// Drive Client Instance
const driveClient = new DriveClient(async (status) => {
    const badge = document.getElementById('drive-status');
    // Also update start screen button text or tooltip if possible, or just console
    console.log("Drive Status:", status);

    // Using badge in header if exists? No header badge in current HTML?
    // Wait, header has "G" button that is small. We might not have a text badge visible.
    // We can alert on major errors? Or just console.

    if (status.includes("Found stats.json") || status.includes("Auth OK") || status.includes("認証成功")) {
        // Trigger load sequence logic
        if (driveClient.accessToken) {
            await reloadDataFromDrive();
        }
    }
});

async function reloadDataFromDrive() {
    // Load Questions
    const qData = await driveClient.loadData('questions.json');
    if (qData) {
        questionsData = qData;
        console.log("Questions loaded from Drive");
    }

    // Load Stats
    const sData = await driveClient.loadData('stats.json');
    if (sData) {
        statistics = sData;
        localStorage.setItem('sokusel_stats', JSON.stringify(statistics));
        updateStatsUI();
        console.log("Stats synced from Drive");
    }
}

// --- DOM Elements ---
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-area'),
    result: document.getElementById('result-area'),
    editor: document.getElementById('editor-screen'),
    stats: document.getElementById('stats-screen')
};

// Start Screen Elements
const genreOptions = document.getElementById('genre-options');
const countOptions = document.getElementById('count-options');
const startBtn = document.getElementById('start-btn');

// Old Header Buttons (Might not exist if I removed header controls? No, header is still there)
const authBtn = document.getElementById('auth-btn');
// Ensure these variables don't crash if null
const paramsBtn = document.getElementById('params-btn');
const editorBtn = document.getElementById('editor-btn');

// Game Elements
const sentenceArea = document.getElementById('sentence-area');
const instructionText = document.getElementById('instruction-text');
const selectionModal = document.getElementById('selection-modal');
const overlay = document.getElementById('overlay');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackBox = document.getElementById('feedback');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackDesc = document.getElementById('feedback-desc');
const progressDisplay = document.getElementById('progress');
const charMsg = document.getElementById('char-msg');

// Result Elements
const finalScore = document.getElementById('final-score');
const finalVerdict = document.getElementById('final-verdict');
const analyticsChart = document.getElementById('analytics-chart');

// Stats Elements
const totalAnswersEl = document.getElementById('total-answers');
const totalRateEl = document.getElementById('total-rate');
const lastPlayedEl = document.getElementById('last-played');
const statsChart = document.getElementById('stats-chart');
const resetStatsBtn = document.getElementById('reset-stats-btn');
const statsCloseBtn = document.getElementById('stats-close-btn');

// Editor Elements
const editorCloseBtn = document.getElementById('editor-close-btn');
const questionList = document.getElementById('question-list');
const addQuestionBtn = document.getElementById('add-question-btn');
const saveDriveBtn = document.getElementById('save-drive-btn');
const editorForm = document.getElementById('editor-form');
const editId = document.getElementById('edit-id');
const editGenre = document.getElementById('edit-genre');
const editSegments = document.getElementById('edit-segments');
const editExplanation = document.getElementById('edit-explanation');
const editSaveBtn = document.getElementById('edit-save-btn');
const editCancelBtn = document.getElementById('edit-cancel-btn');
const editDeleteBtn = document.getElementById('edit-delete-btn');

let editingIndex = -1;

// Character Messages
const charMessages = {
    correct: [
        "お見事！その調子です！",
        "正解！完璧ですね！",
        "さすが！よく勉強していますね。",
        "素晴らしい！基本はバッチリです。"
    ],
    wrong: [
        "おしい！次は気をつけましょう。",
        "ドンマイ！解説を読んで復習です。",
        "ここは間違えやすいポイントです。",
        "焦らず、しっかり確認しましょう。"
    ],
    final: {
        perfect: "全問正解！？信じられません！神レベルです！",
        great: "素晴らしい成績です！合格は目の前ですね！",
        good: "お疲れ様でした！着実に力がついています。",
        fighting: "お疲れ様でした！復習して弱点を克服しましょう！"
    }
};

// --- Initialization ---
window.addEventListener('load', () => {
    driveClient.init();
    updateStatsUI();
});

// --- Navigation ---
function showScreen(name) {
    // Hide all screens/sections
    Object.values(screens).forEach(el => {
        if (el) {
            el.classList.remove('active');
            el.classList.add('hidden');
            if (name === 'game' && el === screens.game) {
                el.style.display = 'block';
            }
            if (name !== 'game' && el === screens.game) {
                el.style.display = 'none';
            }
        }
    });

    const target = screens[name];
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    if (name === 'start') {
        screens.start.classList.add('active');
        screens.start.classList.remove('hidden');
        screens.game.style.display = 'none';
        screens.result.classList.add('hidden');
    }
}

// --- Event Listeners: Main Menu ---
// Use optional chaining or checks
if (authBtn) authBtn.onclick = () => driveClient.login();
if (paramsBtn) paramsBtn.onclick = () => { updateStatsUI(); showScreen('stats'); };
if (editorBtn) editorBtn.onclick = () => { renderQuestionList(); showScreen('editor'); };
if (statsCloseBtn) statsCloseBtn.onclick = () => showScreen('start');
if (editorCloseBtn) editorCloseBtn.onclick = () => showScreen('start');

// --- Game Start Logic ---
if (genreOptions) genreOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('genre-card')) {
        document.querySelectorAll('.genre-card').forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedGenre = e.target.dataset.value;
    }
});

if (countOptions) countOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('count-btn')) {
        document.querySelectorAll('.count-btn').forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedCount = parseInt(e.target.dataset.value);
    }
});

if (startBtn) startBtn.onclick = () => {
    // Filter Questions
    if (selectedGenre === 'all') {
        filteredQuestions = [...questionsData];
    } else {
        filteredQuestions = questionsData.filter(q => q.genre === selectedGenre);
    }

    // Shuffle
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }

    // Limit Count
    if (filteredQuestions.length > selectedCount) {
        filteredQuestions = filteredQuestions.slice(0, selectedCount);
    }

    if (filteredQuestions.length === 0) {
        alert("該当する問題がありません。別の設定を試してください。");
        return;
    }

    // Initialize Game Session
    score = 0;
    currentQIndex = 0;
    sessionGenreScores = {};
    filteredQuestions.forEach(q => {
        const g = q.genre || 'その他';
        if (!sessionGenreScores[g]) sessionGenreScores[g] = { total: 0, correct: 0 };
    });

    // Start UI
    screens.start.classList.add('fade-out');
    setTimeout(() => {
        screens.start.classList.remove('active');
        screens.start.classList.remove('fade-out');
        showScreen('game');
        initQuestion();
    }, 300);
};

// --- Game Logic ---
function initQuestion() {
    isChecked = false;
    activeSegmentIndex = null;
    if (feedbackBox) {
        feedbackBox.classList.remove('visible', 'success', 'error');
        feedbackBox.classList.add('hidden');
    }
    if (selectionModal) selectionModal.classList.add('hidden');
    if (checkBtn) checkBtn.classList.remove('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (overlay) overlay.classList.remove('active');
    if (charMsg && charMsg.parentElement) charMsg.parentElement.style.visibility = 'hidden';

    const maxQ = filteredQuestions.length;
    if (currentQIndex >= maxQ) {
        showSummary();
        return;
    }

    const q = filteredQuestions[currentQIndex];
    if (progressDisplay) progressDisplay.textContent = `Q${currentQIndex + 1} / ${maxQ}`;
    if (instructionText) instructionText.textContent = q.instruction || "誤っている箇所を訂正しなさい。";

    currentSegments = JSON.parse(JSON.stringify(q.segments));
    renderSentence();
}

function renderSentence() {
    if (!sentenceArea) return;
    sentenceArea.innerHTML = '';
    currentSegments.forEach((seg, index) => {
        const span = document.createElement('span');
        span.textContent = seg.text;
        span.className = 'segment';

        if (seg.type === 'interactive') {
            span.classList.add('interactive');
            if (isChecked) {
                if (seg.text === seg.correctAnswer) {
                    span.classList.add('correct-state');
                } else {
                    span.classList.add('wrong-state');
                }
            } else {
                span.onclick = (e) => openModal(e, index);
            }
        }
        sentenceArea.appendChild(span);
    });
}

function openModal(itemEvent, index) {
    if (isChecked) return;
    const segment = currentSegments[index];
    activeSegmentIndex = index;
    const shuffledOptions = [...segment.options].sort(() => Math.random() - 0.5);

    selectionModal.innerHTML = '';
    shuffledOptions.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'modal-option';
        div.textContent = opt;
        div.onclick = () => selectOption(opt);
        selectionModal.appendChild(div);
    });

    const rect = itemEvent.target.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    selectionModal.style.top = (rect.bottom - containerRect.top + 10) + 'px';
    selectionModal.style.left = (rect.left - containerRect.left) + 'px';

    selectionModal.classList.remove('hidden');
    overlay.classList.add('active');
}

function selectOption(text) {
    if (activeSegmentIndex !== null) {
        currentSegments[activeSegmentIndex].text = text;
        renderSentence();
    }
    closeModal();
}

function closeModal() {
    if (selectionModal) selectionModal.classList.add('hidden');
    if (overlay) overlay.classList.remove('active');
    activeSegmentIndex = null;
}
if (overlay) overlay.onclick = closeModal;

if (checkBtn) checkBtn.onclick = () => {
    isChecked = true;
    checkBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    const q = filteredQuestions[currentQIndex];
    const g = q.genre || 'その他';

    if (!sessionGenreScores[g]) sessionGenreScores[g] = { total: 0, correct: 0 };
    sessionGenreScores[g].total++;

    const allCorrect = currentSegments.filter(s => s.type === 'interactive').every(s => s.text === s.correctAnswer);

    renderSentence();

    feedbackBox.classList.remove('hidden');
    void feedbackBox.offsetWidth; // Reflow
    feedbackBox.classList.add('visible');

    charMsg.parentElement.style.visibility = 'visible';

    // Update Stats
    updateStats(g, allCorrect);

    if (allCorrect) {
        score++;
        sessionGenreScores[g].correct++;
        feedbackTitle.textContent = "正解！";
        feedbackBox.classList.add('success');
        charMsg.textContent = getRandomMsg('correct');
    } else {
        feedbackTitle.textContent = "不正解...";
        feedbackBox.classList.add('error');
        charMsg.textContent = getRandomMsg('wrong');
    }
    feedbackDesc.textContent = q.explanation;
};

if (nextBtn) nextBtn.onclick = () => {
    currentQIndex++;
    initQuestion();
};

function getRandomMsg(type) {
    const list = charMessages[type];
    return list[Math.floor(Math.random() * list.length)];
}

function showSummary() {
    screens.game.style.display = 'none';

    screens.result.classList.remove('hidden');

    const totalQ = filteredQuestions.length;
    finalScore.textContent = `${score} / ${totalQ}`;

    const percent = (score / totalQ) * 100;
    if (percent === 100) finalVerdict.textContent = "完全制覇！";
    else if (percent >= 80) finalVerdict.textContent = "合格圏内！";
    else finalVerdict.textContent = "試験終了";

    analyticsChart.innerHTML = '';
    Object.keys(sessionGenreScores).forEach(genre => {
        const data = sessionGenreScores[genre];
        if (data.total === 0) return;
        const rate = Math.round((data.correct / data.total) * 100);

        const row = document.createElement('div');
        row.className = 'chart-row';
        row.innerHTML = `
            <div class="chart-label">${genre}</div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: 0%"></div>
            </div>
            <div class="chart-value">${data.correct}/${data.total}</div>
        `;
        analyticsChart.appendChild(row);

        setTimeout(() => {
            row.querySelector('.chart-bar-fill').style.width = `${rate}%`;
        }, 100);
    });
}

const retryBtn = document.getElementById('retry-btn');
if (retryBtn) retryBtn.onclick = () => showScreen('start');


// --- Statistics Logic ---
function updateStats(genre, isCorrect) {
    statistics.totalAnswers++;
    if (isCorrect) statistics.totalCorrect++;

    if (!statistics.genreStats[genre]) {
        statistics.genreStats[genre] = { correct: 0, total: 0 };
    }
    statistics.genreStats[genre].total++;
    if (isCorrect) statistics.genreStats[genre].correct++;

    statistics.lastPlayed = new Date().toLocaleDateString('ja-JP');

    localStorage.setItem('sokusel_stats', JSON.stringify(statistics));

    if (driveClient.accessToken) {
        driveClient.saveData('stats.json', statistics);
    }
}

function updateStatsUI() {
    if (!totalAnswersEl) return;
    totalAnswersEl.textContent = statistics.totalAnswers;
    const rate = statistics.totalAnswers > 0
        ? Math.round((statistics.totalCorrect / statistics.totalAnswers) * 100)
        : 0;
    totalRateEl.textContent = `${rate}%`;
    lastPlayedEl.textContent = statistics.lastPlayed;

    statsChart.innerHTML = '';
    Object.keys(statistics.genreStats).forEach(genre => {
        const d = statistics.genreStats[genre];
        const r = Math.round((d.correct / d.total) * 100);

        const row = document.createElement('div');
        row.className = 'chart-row';
        row.innerHTML = `
            <div class="chart-label">${genre}</div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: 0%"></div>
            </div>
            <div class="chart-value">${r}%</div>
        `;
        statsChart.appendChild(row);

        setTimeout(() => row.querySelector('.chart-bar-fill').style.width = `${r}%`, 100);
    });
}

if (resetStatsBtn) resetStatsBtn.onclick = () => {
    if (confirm("全ての学習記録をリセットしますか？")) {
        statistics = { totalAnswers: 0, totalCorrect: 0, lastPlayed: '-', genreStats: {} };
        localStorage.removeItem('sokusel_stats');
        updateStatsUI();
    }
};


// --- Editor Logic ---
function renderQuestionList() {
    if (!questionList) return;
    questionList.innerHTML = '';
    questionsData.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<span>${q.id}</span><span style="font-size:0.8rem; color:#64748b;">${q.genre}</span>`;
        div.onclick = () => openEditor(idx);
        questionList.appendChild(div);
    });
}

if (addQuestionBtn) addQuestionBtn.onclick = () => {
    editingIndex = -1;
    editorForm.classList.remove('hidden');
    editId.value = `New-${Date.now()}`;
    editGenre.value = "測量法";
    editSegments.value = JSON.stringify([
        { text: "新しい", type: "static" },
        { text: "問題", type: "static" }
    ], null, 2);
    editExplanation.value = "";
    editorForm.scrollIntoView({ behavior: 'smooth' });
};

function openEditor(idx) {
    editingIndex = idx;
    const q = questionsData[idx];
    editorForm.classList.remove('hidden');
    editId.value = q.id;
    editGenre.value = q.genre;
    editSegments.value = JSON.stringify(q.segments, null, 2);
    editExplanation.value = q.explanation;
    editorForm.scrollIntoView({ behavior: 'smooth' });
}

if (editSaveBtn) editSaveBtn.onclick = () => {
    try {
        const newQ = {
            id: editId.value,
            genre: editGenre.value,
            instruction: "誤っている箇所を訂正しなさい。",
            segments: JSON.parse(editSegments.value),
            explanation: editExplanation.value
        };

        if (editingIndex >= 0) {
            questionsData[editingIndex] = newQ;
        } else {
            questionsData.push(newQ);
        }

        editorForm.classList.add('hidden');
        renderQuestionList();

        // Auto-save to Drive if available
        if (driveClient.accessToken) {
            driveClient.saveData('questions.json', questionsData);
        }
    } catch (e) {
        alert("JSON形式に誤りがあります:\n" + e.message);
    }
};

if (editCancelBtn) editCancelBtn.onclick = () => {
    editorForm.classList.add('hidden');
};

if (editDeleteBtn) editDeleteBtn.onclick = () => {
    if (editingIndex >= 0 && confirm("この問題を削除しますか？")) {
        questionsData.splice(editingIndex, 1);
        editorForm.classList.add('hidden');
        renderQuestionList();
        if (driveClient.accessToken) driveClient.saveData('questions.json', questionsData);
    }
};

if (saveDriveBtn) saveDriveBtn.onclick = () => {
    if (!driveClient.accessToken) {
        alert("先にGoogle認証を行ってください");
        return;
    }
    driveClient.saveData('questions.json', questionsData);
    driveClient.saveData('questions.json', questionsData);
    driveClient.saveData('stats.json', statistics);
};

// Start Screen Buttons (Bound here to ensure availability)
const startAuthBtn = document.getElementById('auth-btn-start');
const startParamsBtn = document.getElementById('params-btn-start');
const startEditorBtn = document.getElementById('editor-btn-start');

if (startAuthBtn) startAuthBtn.onclick = () => driveClient.login();
if (startParamsBtn) startParamsBtn.onclick = () => { updateStatsUI(); showScreen('stats'); };
if (startEditorBtn) startEditorBtn.onclick = () => { renderQuestionList(); showScreen('editor'); };
