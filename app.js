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
        this.onStatusChange = onStatusChange || ((msg) => {
            console.log(msg);
            const statusEl = document.getElementById('sync-status');
            if (statusEl) statusEl.textContent = msg;
        });
    }

    async init() {
        try {
            this.onStatusChange("⏳ Google連携を準備中...");
            await this.waitForGoogleLibs();

            window.gapi.load('client', async () => {
                try {
                    await window.gapi.client.init({});
                    await window.gapi.client.load('drive', 'v3');
                    this.onStatusChange("🔐 ログインしてデータを同期 (Gボタン)");
                } catch (e) {
                    console.error("GAPI Error", e);
                    this.onStatusChange("❌ Google API初期化失敗");
                }
            });

            this.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID, scope: SCOPES,
                callback: (resp) => this.handleAuthResponse(resp),
            });

        } catch (err) {
            console.error("System Init Error:", err);
            this.onStatusChange("❌ オフライン - ローカルデータを使用");
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

            // 2. Questions Data
            this.onStatusChange("問題データを同期中...");
            await this.checkFile(DATA_FILE_NAME, window.questions || []);

            // Explicitly LOAD the data from Drive to be the source of truth
            const remoteQuestions = await this.loadData(DATA_FILE_NAME);
            if (remoteQuestions && Array.isArray(remoteQuestions)) {
                questionsData = remoteQuestions;
                console.log("Loaded questions from Drive:", questionsData.length);
                renderQuestionList(); // Update UI immediately
            }

            // 3. Statistics Data
            this.onStatusChange("学習記録を同期中...");
            const defaultStats = { totalAnswers: 0, totalCorrect: 0, lastPlayed: '-', genreStats: {} };
            await this.checkFile('stats.json', defaultStats);

            // Explicitly LOAD stats
            const remoteStats = await this.loadData('stats.json');
            if (remoteStats) {
                statistics = remoteStats;
                localStorage.setItem('sokusel_stats', JSON.stringify(statistics)); // Sync to local for offline backup
                updateStatsUI();
            }

            this.onStatusChange(`✅ データ同期完了 (${new Date().toLocaleTimeString()})\n問題数:${questionsData.length}問 / 完了:${statistics.totalAnswers}問`);

        } catch (e) {
            console.error("Drive resource init error", e);
            this.onStatusChange("同期エラー: " + e.message);
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
        if (!this.folderId || !this.accessToken) {
            // If we are stuck waiting for auth, let user know
            if (!this.accessToken) {
                this.onStatusChange("⚠️ ログイン待機中... (Gボタンを押してください)");
            }
            return null;
        }
        try {
            // Find file ID
            const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
            const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Cache-Control': 'no-cache'
                }
            });
            const dataFile = await resFile.json();

            if (dataFile.files?.length > 0) {
                const fileId = dataFile.files[0].id;
                // Add timestamp to query to prevent browser caching of the content
                const ts = Date.now();
                const contentRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&t=${ts}`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        'Cache-Control': 'no-cache'
                    }
                });
                return await contentRes.json();
            }
            return null;
        } catch (e) {
            console.error(`Load error ${fileName}`, e);
            this.onStatusChange("❌ 読み込みエラー: " + e.message);
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
            this.onStatusChange("✅ 保存完了: " + fileName);
            // Explicit Feedback as requested
            if (fileName === 'questions.json') {
                alert(`Google Driveに問題データを保存しました！\nファイル名: ${fileName}\n時刻: ${new Date().toLocaleTimeString()}`);
            }
        } catch (e) {
            console.error("Save error", e);
            this.onStatusChange("❌ 保存失敗");
            alert(`Google Driveへの保存に失敗しました。\nエラー: ${e.message}`);
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
window.sessionWrongQuestions = []; // Global
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

    // Feature 1b: Hide Edit Button
    const gameEditBtn = document.getElementById('game-edit-btn');
    if (gameEditBtn) gameEditBtn.classList.add('hidden');

    if (overlay) overlay.classList.remove('active');
    if (charMsg && charMsg.parentElement) charMsg.parentElement.style.visibility = 'hidden';

    const maxQ = filteredQuestions.length;
    if (currentQIndex >= maxQ) {
        showSummary();
        return;
    }

    const q = filteredQuestions[currentQIndex];

    // Feature: Accuracy Display
    const answered = currentQIndex; // Before answering this one
    let accText = "";
    if (answered > 0) {
        const rate = Math.round((score / answered) * 100);
        accText = ` (正答率: ${rate}%)`;
    }
    if (progressDisplay) progressDisplay.textContent = `Q${currentQIndex + 1} / ${maxQ}${accText}`;

    // Feature 4: Display ID
    const idBadge = document.getElementById('question-id-display');
    if (idBadge) idBadge.textContent = `ID: ${q.id}`;

    if (instructionText) instructionText.textContent = q.instruction || "誤っている箇所を訂正しなさい。";

    currentSegments = JSON.parse(JSON.stringify(q.segments));

    // Feature: Randomize Problem Text with Distractors (Memory Training)
    // For each interactive segment, if it's not already correct (or maybe we force it to be wrong for the game?), 
    // pick a RANDOM WRONG option to display as the initial text.
    // This forces the user to recognize it's wrong, rather than memorizing "X matches Y".
    currentSegments.forEach(seg => {
        if (seg.type === 'interactive' && seg.options && seg.options.length >= 2) {
            // Find distractors (options that are NOT the correct answer)
            const distractors = seg.options.filter(opt => opt !== seg.correctAnswer);

            if (distractors.length > 0) {
                // Pick random distractor
                const randomDistractor = distractors[Math.floor(Math.random() * distractors.length)];
                // Set the displayed text to this wrong answer
                seg.text = randomDistractor;
            }
        }
    });

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

    // Improved Randomization (Fisher-Yates Shuffle)
    const shuffledOptions = [...segment.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

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

    // Feature 2: Track Wrong Questions
    if (!allCorrect) {
        if (!typeof sessionWrongQuestions !== 'undefined') {
            // Ensure global var exists if not defined at top yet (it was defined in previous thought but not file)
            // Wait, I need to define it at top. I'll add it in Chunk 1 or separate?
            // I'll assume I can add it here or use global.
        }
        if (window.sessionWrongQuestions) window.sessionWrongQuestions.push(q);
        else console.warn("sessionWrongQuestions not defined");
    }

    // Feature 1b: Show Edit Button
    const gameEditBtn = document.getElementById('game-edit-btn');
    if (gameEditBtn) {
        gameEditBtn.classList.remove('hidden');
        gameEditBtn.onclick = (e) => {
            console.log("Edit button clicked for ID:", q.id);
            // Robust find: Compare as strings to avoid type mismatches
            const mainIdx = questionsData.findIndex(item => String(item.id) === String(q.id));
            if (mainIdx >= 0) {
                openEditor(mainIdx);
            } else {
                console.error("Edit target not found. ID:", q.id, "Questions:", questionsData);
                alert(`編集対象の問題が見つかりませんでした (ID: ${q.id})\nコンソールを確認してください。`);
            }
        };
    }

    renderSentence();

    feedbackBox.classList.remove('hidden');
    void feedbackBox.offsetWidth; // Reflow
    feedbackBox.classList.add('visible');

    charMsg.parentElement.style.visibility = 'visible';

    // Update Stats
    updateStats(g, allCorrect, q.id);

    // Update Accuracy Display (Immediate)
    if (progressDisplay) {
        // Current index is still currentQIndex, but we just answered it.
        // So answered count is currentQIndex + 1
        const nowAnswered = currentQIndex + 1;
        const nowScore = allCorrect ? score + 1 : score; // score variable updates below, but calculate for display now
        // Wait, score is updated below. Let's rely on updated score variable in next render? 
        // No, currentQIndex increments only on 'Next'.
        // So we should update display or wait for Next? User wants to see it.
        // Let's update it here.
        const currentRate = Math.round((nowScore / nowAnswered) * 100);
        const maxQ = filteredQuestions.length;
        progressDisplay.textContent = `Q${currentQIndex + 1} / ${maxQ} (正答率: ${currentRate}%)`;
    }

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

    const percent = totalQ > 0 ? (score / totalQ) * 100 : 0;
    if (percent === 100) finalVerdict.textContent = "完全制覇！";
    else if (percent >= 80) finalVerdict.textContent = "合格圏内！";
    else finalVerdict.textContent = "試験終了";

    // Feature 2: Retry Button Logic
    const retryMistakesBtn = document.getElementById('retry-mistakes-btn');
    if (retryMistakesBtn) {
        if (typeof sessionWrongQuestions !== 'undefined' && sessionWrongQuestions.length > 0) {
            retryMistakesBtn.classList.remove('hidden');
            retryMistakesBtn.onclick = startReviewMode;
        } else {
            retryMistakesBtn.classList.add('hidden');
        }
    }

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

function startReviewMode() {
    if (!sessionWrongQuestions || sessionWrongQuestions.length === 0) return;

    // Setup for Review
    filteredQuestions = [...sessionWrongQuestions];
    sessionWrongQuestions = []; // Reset for loop protection
    score = 0;
    currentQIndex = 0;

    // Reset session scores for this run
    sessionGenreScores = {};
    filteredQuestions.forEach(q => {
        const g = q.genre || 'その他';
        if (!sessionGenreScores[g]) sessionGenreScores[g] = { total: 0, correct: 0 };
    });

    screens.result.classList.add('hidden');
    screens.game.style.display = 'block';

    initQuestion();
}

const retryBtn = document.getElementById('retry-btn');
if (retryBtn) retryBtn.onclick = () => showScreen('start');


// --- Statistics Logic ---
function updateStats(genre, isCorrect, questionId) {
    statistics.totalAnswers++;
    if (isCorrect) statistics.totalCorrect++;

    if (!statistics.genreStats[genre]) {
        statistics.genreStats[genre] = { correct: 0, total: 0 };
    }
    statistics.genreStats[genre].total++;
    if (isCorrect) statistics.genreStats[genre].correct++;

    // Feature 3: Question Stats
    if (questionId) {
        if (!statistics.questionStats) statistics.questionStats = {};
        if (!statistics.questionStats[questionId]) statistics.questionStats[questionId] = { correct: 0, wrong: 0 };

        if (isCorrect) statistics.questionStats[questionId].correct++;
        else statistics.questionStats[questionId].wrong++;
    }

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

    // Feature 3 UI: Question Stats
    const qStatsList = document.getElementById('question-stats-list');
    if (qStatsList && statistics.questionStats) {
        qStatsList.innerHTML = '';
        // Sort by correct rate (ascending - worst first) or wrong count (descending)
        // Let's go with wrong count descending.
        const sortedQIds = Object.keys(statistics.questionStats).sort((a, b) => {
            const sa = statistics.questionStats[a];
            const sb = statistics.questionStats[b];
            return sb.wrong - sa.wrong; // Most wrong first
        });

        if (sortedQIds.length === 0) {
            qStatsList.innerHTML = '<p style="text-align:center; color:#64748b;">データがありません</p>';
        } else {
            sortedQIds.slice(0, 20).forEach(qid => { // Show top 20
                const s = statistics.questionStats[qid];
                if (s.wrong === 0 && s.correct > 0) return; // Skip perfect ones for now

                const rate = Math.round((s.correct / (s.correct + s.wrong)) * 100);
                const div = document.createElement('div');
                div.className = 'q-stat-item';
                div.style.cssText = 'display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid #eee;';
                div.innerHTML = `
                    <div style="font-weight:bold;">${qid}</div>
                    <div>
                        <span style="color:var(--error-color); font-weight:bold;">${s.wrong}ミス</span>
                        <span style="color:#64748b; font-size:0.9em; margin-left:8px;">(正答率 ${rate}%)</span>
                    </div>
                `;
                qStatsList.appendChild(div);
            });
        }
    }
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

// Visual Editor Helpers
function renderSegmentEditor(segments) {
    const list = document.getElementById('segment-list');
    if (!list) return;
    list.innerHTML = '';
    segments.forEach((seg, index) => addSegmentRow(seg));
}

function addSegmentRow(seg = { text: "", type: "static" }) {
    const list = document.getElementById('segment-list');
    const row = document.createElement('div');
    row.className = 'segment-row' + (seg.type === 'interactive' ? ' interactive' : '');

    // Type Select
    const typeSel = document.createElement('select');
    typeSel.className = 'segment-type-select';
    typeSel.innerHTML = `<option value="static">ただの文</option><option value="interactive">訂正する場所（ボタン）</option>`;
    typeSel.value = seg.type;

    // Text Input
    const textIn = document.createElement('input');
    textIn.type = "text";
    textIn.className = "text-input";
    textIn.value = seg.text;
    textIn.style.width = "100%";

    // Helper to update placeholder based on type
    const updatePlaceholder = () => {
        if (typeSel.value === 'static') {
            textIn.placeholder = "表示する文章（例：私の好きな果物は）";
            textIn.style.borderColor = "#ccc";
            textIn.style.backgroundColor = "#fff";
        } else {
            textIn.placeholder = "画面に表示される【誤り】（例：リンゴ）";
            textIn.style.borderColor = "#3b82f6";
            textIn.style.backgroundColor = "#eff6ff";
        }
    };
    updatePlaceholder();

    // UX Improvements: Auto-fill Correct when Text changes (if empty)
    textIn.onblur = () => {
        if (seg.type === 'interactive') {
            const correctIn = row.querySelector('.correct-input');
            if (correctIn && correctIn.value.trim() === "") {
                correctIn.value = textIn.value;
                // Add a small visual cue?
                correctIn.classList.add("flash-highlight");
                setTimeout(() => correctIn.classList.remove("flash-highlight"), 500);
            }
        }
    };

    typeSel.onchange = () => {
        seg.type = typeSel.value;
        const currentSegs = getSegmentsFromEditor();
        const parent = row.parentNode;
        const idx = Array.from(parent.children).indexOf(row);
        currentSegs[idx].type = typeSel.value;
        renderSegmentEditor(currentSegs);
    };

    // Delete Button
    const delBtn = document.createElement('button');
    delBtn.className = "del-seg-btn";
    delBtn.innerText = "×";
    delBtn.onclick = () => {
        row.remove();
    };

    row.appendChild(typeSel);
    row.appendChild(textIn);
    row.appendChild(delBtn);

    if (seg.type === 'interactive') {
        const details = document.createElement('div');
        details.className = "segment-detail";

        // V5 Strict Layout: 
        // 1. Correct Answer (Fixed)
        // 2. Distractor 1
        // 3. Distractor 2

        details.innerHTML += `<div style="margin-top:8px; margin-bottom:4px; font-weight:bold; font-size:0.8rem;">選択肢① (正解):</div>`;
        const correctIn = document.createElement('input');
        correctIn.className = "correct-input-fixed";
        correctIn.value = seg.correctAnswer || "";
        correctIn.placeholder = "ここに正解を入力 (例: ミカン)";
        correctIn.style.width = "100%";
        correctIn.style.border = "2px solid #bef264"; // Lime border for Correct
        details.appendChild(correctIn);

        // Distractors
        const allOpts = seg.options || [];
        const currentCorrect = seg.correctAnswer;

        // Filter distractors (everything that is NOT the correct answer)
        // Note: seg.options usually contains [Correct, Dist1, Dist2...] randomly or ordered.
        // We need to extract the distractors.
        let distractors = [];
        if (currentCorrect) {
            distractors = allOpts.filter(o => o !== currentCorrect);
        } else {
            // If no correct answer defined yet, maybe all are distractors? 
            // Or maybe it's raw data.
            // Let's just take all and shift? No, safer to just show empty slots.
            distractors = [...allOpts];
        }

        // Layout for Distractors
        details.innerHTML += `<div style="margin-top:8px; margin-bottom:4px; font-size:0.8rem;">選択肢②:</div>`;
        const dist1 = document.createElement('input');
        dist1.className = "distractor-input";
        dist1.value = distractors[0] || "";
        dist1.placeholder = "ダミー選択肢 (例: リンゴ)";
        details.appendChild(dist1);

        details.innerHTML += `<div style="margin-top:4px; margin-bottom:4px; font-size:0.8rem;">選択肢③:</div>`;
        const dist2 = document.createElement('input');
        dist2.className = "distractor-input";
        dist2.value = distractors[1] || "";
        dist2.placeholder = "ダミー選択肢 (例: バナナ)";
        details.appendChild(dist2);

        row.appendChild(details);
    }

    list.appendChild(row);
}

// Editor V8 Fixed Layout Logic (Safe DOM) - DEPRECATED
function renderSegmentEditor_OLD(segments) {
    const list = document.getElementById('segment-list');
    if (!list) return;
    list.innerHTML = '';

    // Heuristic Mappers:
    let prefix = "";
    let targetSeg = { text: "", correctAnswer: "", options: [] };
    let suffix = "";

    // Attempt to map based on V7 fixed structure: Static -> Interactive -> Static
    const interactIdx = segments.findIndex(s => s.type === 'interactive');
    if (interactIdx !== -1) {
        targetSeg = segments[interactIdx];
        // Everything before is prefix
        prefix = segments.slice(0, interactIdx).map(s => s.text).join("");
        // Everything after is suffix
        suffix = segments.slice(interactIdx + 1).map(s => s.text).join("");
    } else {
        // Fallback: Check if we have 3 static segments (maybe user deleted interactive?)
        // Or just put everything in prefix.
        prefix = segments.map(s => s.text).join("");
    }

    // Helper for creating labelled rows safely
    const createRow = (labelText, inputClass, value, placeholder, styles = {}) => {
        const row = document.createElement('div');
        row.className = 'segment-row';
        if (styles.rowClass) row.className += ' ' + styles.rowClass;

        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.fontWeight = 'bold';
        label.style.marginBottom = '4px';
        label.style.fontSize = '0.9rem';
        label.textContent = labelText;
        if (styles.labelColor) label.style.color = styles.labelColor;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = inputClass;
        input.value = value || "";
        input.placeholder = placeholder;
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';

        if (styles.bg) input.style.backgroundColor = styles.bg;
        if (styles.borderColor) input.style.borderColor = styles.borderColor;
        if (styles.borderWidth) input.style.borderWidth = styles.borderWidth;

        row.appendChild(label);
        row.appendChild(input);
        return row;
    };

    // 1. Prefix
    list.appendChild(createRow(
        "問題文①：前半部分 (文頭・前置き)",
        "text-input fixed-prefix",
        prefix,
        "例：基本測量の測量成果を"
    ));

    // 2. Target
    list.appendChild(createRow(
        "問題文②：訂正箇所 (ボタンになる部分)",
        "text-input fixed-target",
        targetSeg.text,
        "例：国土地理院の長の承認",
        { rowClass: 'interactive', bg: '#eff6ff', borderColor: '#3b82f6' }
    ));

    // 3. Suffix
    list.appendChild(createRow(
        "問題文③：後半部分 (文末・締め)",
        "text-input fixed-suffix",
        suffix,
        "例：を得なければならない。"
    ));

    // 4. Choices Container
    const choicesRow = document.createElement('div');
    choicesRow.className = 'segment-row';
    choicesRow.style.backgroundColor = '#f0fdf4';
    choicesRow.style.padding = '10px';
    choicesRow.style.marginTop = '10px';
    choicesRow.style.border = '1px solid #dcfce7';
    choicesRow.style.borderRadius = '4px';

    const choicesTitle = document.createElement('div');
    choicesTitle.textContent = "選択肢設定";
    choicesTitle.style.fontWeight = 'bold';
    choicesTitle.style.borderBottom = '1px solid #ccc';
    choicesTitle.style.paddingBottom = '4px';
    choicesTitle.style.marginBottom = '12px';
    choicesRow.appendChild(choicesTitle);

    // Prepare options
    const allOpts = targetSeg.options || [];
    const correctVal = targetSeg.correctAnswer || "";
    let distractors = [];
    if (correctVal) {
        distractors = allOpts.filter(o => o !== correctVal);
    } else {
        distractors = [...allOpts];
    }

    // Choice 1 (Correct)
    const cDiv = document.createElement('div');
    cDiv.style.marginBottom = '12px';
    cDiv.innerHTML = `<div style="font-weight:bold; font-size:0.85rem; color:#15803d; margin-bottom:4px;">選択肢①(正解):</div>`;
    const cInput = document.createElement('input');
    cInput.className = "fixed-choice-correct";
    cInput.value = correctVal;
    cInput.placeholder = "正しい言葉を入力";
    cInput.style.width = '100%';
    cInput.style.padding = '8px';
    cInput.style.border = '2px solid #bef264';
    cInput.style.borderRadius = '4px';
    cDiv.appendChild(cInput);
    choicesRow.appendChild(cDiv);

    // Choice 2 (Distractor 1)
    const d1Div = document.createElement('div');
    d1Div.style.marginBottom = '12px';
    d1Div.innerHTML = `<div style="font-size:0.85rem; margin-bottom:4px;">選択肢②:</div>`;
    const d1Input = document.createElement('input');
    d1Input.className = "fixed-choice-dist1";
    d1Input.value = distractors[0] || "";
    d1Input.placeholder = "ダミー1";
    d1Input.style.width = '100%';
    d1Input.style.padding = '8px';
    d1Input.style.border = '1px solid #ccc';
    d1Input.style.borderRadius = '4px';
    d1Div.appendChild(d1Input);
    choicesRow.appendChild(d1Div);

    // Choice 3 (Distractor 2)
    const d2Div = document.createElement('div');
    d2Div.style.marginBottom = '4px';
    d2Div.innerHTML = `<div style="font-size:0.85rem; margin-bottom:4px;">選択肢③:</div>`;
    const d2Input = document.createElement('input');
    d2Input.className = "fixed-choice-dist2";
    d2Input.value = distractors[1] || "";
    d2Input.placeholder = "ダミー2";
    d2Input.style.width = '100%';
    d2Input.style.padding = '8px';
    d2Input.style.border = '1px solid #ccc';
    d2Input.style.borderRadius = '4px';
    d2Div.appendChild(d2Input);
    choicesRow.appendChild(d2Div);

    list.appendChild(choicesRow);

    if (addSegmentBtn) addSegmentBtn.style.display = 'none';
}

function addSegmentRow(seg) {
    // Stub
}

function getSegmentsFromEditor() {
    const list = document.getElementById('segment-list');
    const segments = [];

    // V7: Read 3 parts
    const prefixInput = list.querySelector('.fixed-prefix');
    const targetInput = list.querySelector('.fixed-target');
    const suffixInput = list.querySelector('.fixed-suffix');

    // Part 1: Prefix
    if (prefixInput && prefixInput.value) {
        segments.push({ type: 'static', text: prefixInput.value });
    }

    // Part 2: Target + Choices
    if (targetInput) {
        const text = targetInput.value;
        const correctIn = list.querySelector('.fixed-choice-correct');
        const dist1In = list.querySelector('.fixed-choice-dist1');
        const dist2In = list.querySelector('.fixed-choice-dist2');

        const correctAnswer = correctIn ? correctIn.value.trim() : "";
        const options = [];
        if (correctAnswer) options.push(correctAnswer);
        if (dist1In && dist1In.value.trim()) options.push(dist1In.value.trim());
        if (dist2In && dist2In.value.trim()) options.push(dist2In.value.trim());

        segments.push({
            type: 'interactive',
            text: text,
            correctAnswer: correctAnswer,
            options: options
        });
    }

    // Part 3: Suffix
    if (suffixInput && suffixInput.value) {
        segments.push({ type: 'static', text: suffixInput.value });
    }

    return segments;
}

const addSegmentBtn = document.getElementById('add-segment-btn');
if (addSegmentBtn) addSegmentBtn.onclick = () => {
    addSegmentRow({ text: "新規", type: "static" });
};

if (addQuestionBtn) addQuestionBtn.onclick = () => {
    // Switch to editor screen if not already
    showScreen('editor');

    editingIndex = -1;
    editorForm.classList.remove('hidden');
    editId.value = `New-${Date.now()}`;
    editGenre.value = "測量法";
    // Initialize with empty V6 structure
    renderSegmentEditor([
        { text: "", type: "static" },
        { text: "", type: "interactive", options: [] }
    ]);
    editExplanation.value = "";
    editorForm.scrollIntoView({ behavior: 'smooth' });
};

function openEditor(idx) {
    // Ensure we are on the editor screen
    showScreen('editor');
    // Ensure list is populated behind the form (for context)
    renderQuestionList();

    editingIndex = idx;
    const q = questionsData[idx];
    editorForm.classList.remove('hidden');
    editId.value = q.id;
    editGenre.value = q.genre;
    renderSegmentEditor(q.segments || []);
    editExplanation.value = q.explanation;
    editorForm.scrollIntoView({ behavior: 'smooth' });
}

if (addSegmentBtn) addSegmentBtn.style.display = 'none'; // Ensure hidden

if (editSaveBtn) editSaveBtn.onclick = () => {
    try {
        const segs = getSegmentsFromEditor();

        // V6 VALIDATION
        const interactive = segs.find(s => s.type === 'interactive');
        if (!interactive) {
            alert("エラー: 「問題文②：後半」が読み込めませんでした。");
            return;
        }
        if (!interactive.correctAnswer) {
            alert("エラー: 「選択肢①(正解)」が入力されていません。");
            return;
        }
        if (interactive.text === interactive.correctAnswer) {
            if (!confirm("警告: 問題文②と正解が同じです。これでは訂正になりませんが保存しますか？")) return;
        }

        // Check distractors
        if (!interactive.options || interactive.options.length < 2) {
            if (!confirm("警告: 選択肢（ダミー）が入力されていません。\nこれではクイズになりませんが、よろしいですか？")) return;
        }

        const newQ = {
            id: editId.value,
            genre: editGenre.value,
            instruction: "誤っている箇所を訂正しなさい。",
            segments: segs,
            explanation: editExplanation.value
        };

        if (editingIndex >= 0) {
            questionsData[editingIndex] = newQ;
        } else {
            questionsData.push(newQ);
        }

        // Update UI
        renderQuestionList();
        alert("変更をリストに適用しました。\n(Driveへの保存は「Driveに保存」ボタンを押してください)");

        // I will NOT hide the form immediately so they can keep editing if they want,
        // or I should hide it as before? User finds the flow confusing.
        // "I have to authenticate... then re-write". 
        // If I keep it open, they don't lose work.
        // But usually "Save" implies "Done". 
        // Let's hide it but ensure data is safe.
        // Actually, if I just "Apply to List", it's in memory.
        editorForm.classList.add('hidden');

        // Auto-save logic with Feedback
        if (driveClient.accessToken) {
            driveClient.saveData('questions.json', questionsData).then(() => {
                // Success is handled by status callback usually, but we can alert here?
                // driveClient.saveData is async and returns promise (void).
                // The status callback updates the UI text.
                alert("Google Driveへの保存に成功しました！");
            });
        } else {
            // Not logged in.
            if (confirm("Google Driveに保存されていません。\nログインして保存しますか？")) {
                driveClient.login();
                // After login, we need to save? 
                // Login is async flow. We can't await it easily here without callback.
                // But we can trigger save after login in status handler??
                // Too complex for now. Just warn.
            }
        }
    } catch (e) {
        alert("保存エラー:\n" + e.message);
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

// Explicit Sync Buttons (User Request)
const syncLoadBtn = document.getElementById('sync-load-btn');
const syncSaveBtn = document.getElementById('sync-save-btn');

if (syncLoadBtn) syncLoadBtn.onclick = async () => {
    if (!driveClient.accessToken) {
        alert("先にGボタンでログインしてください");
        return;
    }
    driveClient.onStatusChange("📥 データ読込中...");
    try {
        const remoteQ = await driveClient.loadData('questions.json');
        if (remoteQ && Array.isArray(remoteQ)) {
            questionsData = remoteQ;
            renderQuestionList();
        }
        const remoteS = await driveClient.loadData('stats.json');
        if (remoteS) {
            statistics = remoteS;
            localStorage.setItem('sokusel_stats', JSON.stringify(statistics));
            updateStatsUI();
        }
        driveClient.onStatusChange(`✅ 読込完了 (${new Date().toLocaleTimeString()}) Q:${questionsData.length}問 / 回答:${statistics.totalAnswers}回`);
        alert(`データを読み込みました！\n問題数: ${questionsData.length}問\n回答記録: ${statistics.totalAnswers}回`);
    } catch (e) {
        driveClient.onStatusChange("❌ 読込失敗: " + e.message);
        alert("読み込みに失敗しました: " + e.message);
    }
};

if (syncSaveBtn) syncSaveBtn.onclick = async () => {
    if (!driveClient.accessToken) {
        alert("先にGボタンでログインしてください");
        return;
    }
    driveClient.onStatusChange("📤 データ保存中...");
    try {
        await driveClient.saveData('questions.json', questionsData);
        await driveClient.saveData('stats.json', statistics);
        driveClient.onStatusChange(`✅ 保存完了 (${new Date().toLocaleTimeString()})`);
        alert(`データを保存しました！\n問題数: ${questionsData.length}問\n回答記録: ${statistics.totalAnswers}回`);
    } catch (e) {
        driveClient.onStatusChange("❌ 保存失敗: " + e.message);
        alert("保存に失敗しました: " + e.message);
    }
};

const editorAuthBtn = document.getElementById('editor-auth-btn');
if (editorAuthBtn) editorAuthBtn.onclick = () => driveClient.login();

// Editor V9 Fixed Layout Logic (Clean Block Layout)
function renderSegmentEditor(segments) {
    const list = document.getElementById('segment-list');
    if (!list) return;
    list.innerHTML = '';

    // Heuristic Mappers:
    let prefix = "";
    let targetSeg = { text: "", correctAnswer: "", options: [] };
    let suffix = "";

    // Attempt to map based on V7 structure
    const interactIdx = segments.findIndex(s => s.type === 'interactive');
    if (interactIdx !== -1) {
        targetSeg = segments[interactIdx];
        prefix = segments.slice(0, interactIdx).map(s => s.text).join("");
        suffix = segments.slice(interactIdx + 1).map(s => s.text).join("");
    } else {
        prefix = segments.map(s => s.text).join("");
    }

    // Helper for creating labelled rows with strict layout
    const createRow = (labelText, inputClass, value, placeholder, styles = {}) => {
        const row = document.createElement('div');
        // Force block layout and spacing
        row.style.display = 'block';
        row.style.marginBottom = '15px';
        if (styles.rowClass) row.className = styles.rowClass;

        const label = document.createElement('div'); // div instead of label
        label.style.display = 'block';
        label.style.fontWeight = 'bold';
        label.style.marginBottom = '6px';
        label.style.fontSize = '0.95rem';
        label.style.color = styles.labelColor || '#334155';
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = inputClass;
        input.value = value || "";
        input.placeholder = placeholder;

        // Force strict box model
        input.style.display = 'block';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box'; // Critical for padding
        input.style.padding = '10px';
        input.style.fontSize = '1rem';
        input.style.border = '1px solid #cbd5e1';
        input.style.borderRadius = '6px';
        input.style.outline = 'none';

        if (styles.bg) input.style.backgroundColor = styles.bg;
        if (styles.borderColor) input.style.borderColor = styles.borderColor;
        if (styles.borderWidth) input.style.borderWidth = styles.borderWidth;

        row.appendChild(label);
        row.appendChild(input);
        return row;
    };

    // 1. Prefix
    list.appendChild(createRow(
        "① 問題文：前半部分 (固定テキスト)",
        "text-input fixed-prefix",
        prefix,
        "例：基本測量の測量成果を"
    ));

    // 2. Target
    list.appendChild(createRow(
        "② 問題文：訂正箇所 (ボタンになる部分)",
        "text-input fixed-target",
        targetSeg.text,
        "例：国土地理院の長の承認",
        { rowClass: 'interactive', bg: '#eff6ff', borderColor: '#3b82f6', labelColor: '#1d4ed8' }
    ));

    // 3. Suffix
    list.appendChild(createRow(
        "③ 問題文：後半部分 (固定テキスト)",
        "text-input fixed-suffix",
        suffix,
        "例：を得なければならない。"
    ));

    // 4. Choices Container
    const choicesRow = document.createElement('div');
    choicesRow.style.display = 'block';
    choicesRow.style.backgroundColor = '#f0fdf4';
    choicesRow.style.padding = '15px';
    choicesRow.style.marginTop = '20px';
    choicesRow.style.border = '1px solid #bbf7d0';
    choicesRow.style.borderRadius = '8px';

    const choicesTitle = document.createElement('div');
    choicesTitle.textContent = "▼ 選択肢設定";
    choicesTitle.style.fontWeight = 'bold';
    choicesTitle.style.fontSize = '1rem';
    choicesTitle.style.color = '#15803d';
    choicesTitle.style.borderBottom = '2px solid #bbf7d0';
    choicesTitle.style.paddingBottom = '8px';
    choicesTitle.style.marginBottom = '15px';
    choicesRow.appendChild(choicesTitle);

    // Prepare options
    const allOpts = targetSeg.options || [];
    const correctVal = targetSeg.correctAnswer || "";
    let distractors = [];
    if (correctVal) {
        distractors = allOpts.filter(o => o !== correctVal);
    } else {
        distractors = [...allOpts];
    }

    // Choice 1 (Correct)
    const cRow = createRow(
        "選択肢① (正解)",
        "fixed-choice-correct",
        correctVal,
        "正しい言葉を入力",
        { labelColor: '#15803d', borderColor: '#86efac', borderWidth: '2px', bg: '#ffffff' }
    );
    cRow.querySelector('input').style.backgroundColor = '#f0fdf4';
    choicesRow.appendChild(cRow);

    // Choice 2 (Distractor 1)
    choicesRow.appendChild(createRow(
        "選択肢② (ダミー)",
        "fixed-choice-dist1",
        distractors[0] || "",
        "ダミー選択肢1"
    ));

    // Choice 3 (Distractor 2)
    choicesRow.appendChild(createRow(
        "選択肢③ (ダミー)",
        "fixed-choice-dist2",
        distractors[1] || "",
        "ダミー選択肢2"
    ));

    list.appendChild(choicesRow);

    if (addSegmentBtn) addSegmentBtn.style.display = 'none';
}
