import { DriveClient } from './js/drive.js';

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

// Drive Client
const driveClient = new DriveClient(async (status) => {
    const badge = document.getElementById('drive-status');
    if (badge) badge.textContent = status;
    if (status.includes("Found stats.json") || status.includes("Auth OK")) {
        // Trigger load sequence logic if needed, but usually we just load when ready
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
    }

    // Load Stats
    const sData = await driveClient.loadData('stats.json');
    if (sData) {
        // Merge with local stats or overwrite? Overwrite is safer for sync
        statistics = sData;
        localStorage.setItem('sokusel_stats', JSON.stringify(statistics));
        updateStatsUI();
        console.log("Stats synced from Drive");
    }
}

// --- DOM Elements ---
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-area'), // Note: game-area acts as a screen section
    result: document.getElementById('result-area'),
    editor: document.getElementById('editor-screen'),
    stats: document.getElementById('stats-screen')
};

// Start Screen Elements
const genreOptions = document.getElementById('genre-options');
const countOptions = document.getElementById('count-options');
const startBtn = document.getElementById('start-btn');
const authBtn = document.getElementById('auth-btn');
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
});

// --- Navigation ---
function showScreen(name) {
    // Hide all screens/sections
    Object.values(screens).forEach(el => {
        if (el) {
            el.classList.remove('active');
            el.classList.add('hidden'); // Ensure hidden helper class is applied
            if (name === 'game' && el === screens.game) {
                el.style.display = 'block'; // Game area uses style.display inline in HTML sometimes
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

    // Special handling for start screen visibility vs game area
    if (name === 'start') {
        screens.start.classList.add('active');
        screens.start.classList.remove('hidden');
        screens.game.style.display = 'none';

        // Reset game state UI
        screens.result.classList.add('hidden');
    }
}

// --- Event Listeners: Main Menu ---
authBtn.onclick = () => driveClient.login();

paramsBtn.onclick = () => {
    updateStatsUI();
    showScreen('stats');
};

editorBtn.onclick = () => {
    renderQuestionList();
    showScreen('editor');
};

statsCloseBtn.onclick = () => showScreen('start');
editorCloseBtn.onclick = () => showScreen('start');

// --- Game Start Logic ---
genreOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('genre-card')) {
        document.querySelectorAll('.genre-card').forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedGenre = e.target.dataset.value;
    }
});

countOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('count-btn')) {
        document.querySelectorAll('.count-btn').forEach(el => el.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedCount = parseInt(e.target.dataset.value);
    }
});

startBtn.onclick = () => {
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
    feedbackBox.classList.remove('visible', 'success', 'error');
    feedbackBox.classList.add('hidden');
    selectionModal.classList.add('hidden');
    checkBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    overlay.classList.remove('active');
    charMsg.parentElement.style.visibility = 'hidden';

    const maxQ = filteredQuestions.length;
    if (currentQIndex >= maxQ) {
        showSummary();
        return;
    }

    const q = filteredQuestions[currentQIndex];
    progressDisplay.textContent = `Q${currentQIndex + 1} / ${maxQ}`;
    instructionText.textContent = q.instruction || "誤っている箇所を訂正しなさい。";

    currentSegments = JSON.parse(JSON.stringify(q.segments));
    renderSentence();
}

function renderSentence() {
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
    selectionModal.classList.add('hidden');
    overlay.classList.remove('active');
    activeSegmentIndex = null;
}
overlay.onclick = closeModal;

checkBtn.onclick = () => {
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

nextBtn.onclick = () => {
    currentQIndex++;
    initQuestion();
};

function getRandomMsg(type) {
    const list = charMessages[type];
    return list[Math.floor(Math.random() * list.length)];
}

function showSummary() {
    screens.game.style.display = 'none';

    // Re-enable result area visibility (it lives outside screens logic slightly in original HTML but let's manage it)
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

// Result to Menu
document.getElementById('retry-btn').onclick = () => showScreen('start');


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

    // Auto-sync stats to Drive
    if (driveClient.accessToken) {
        driveClient.saveData('stats.json', statistics);
    }
}

function updateStatsUI() {
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

function updateStatsDisplay() {
    // Background update if needed
}

resetStatsBtn.onclick = () => {
    if (confirm("全ての学習記録をリセットしますか？")) {
        statistics = { totalAnswers: 0, totalCorrect: 0, lastPlayed: '-', genreStats: {} };
        localStorage.removeItem('sokusel_stats');
        updateStatsUI();
    }
};


// --- Editor Logic ---
function renderQuestionList() {
    questionList.innerHTML = '';
    questionsData.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<span>${q.id}</span><span style="font-size:0.8rem; color:#64748b;">${q.genre}</span>`;
        div.onclick = () => openEditor(idx);
        questionList.appendChild(div);
    });
}

addQuestionBtn.onclick = () => {
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

editSaveBtn.onclick = () => {
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

editCancelBtn.onclick = () => {
    editorForm.classList.add('hidden');
};

editDeleteBtn.onclick = () => {
    if (editingIndex >= 0 && confirm("この問題を削除しますか？")) {
        questionsData.splice(editingIndex, 1);
        editorForm.classList.add('hidden');
        renderQuestionList();
        if (driveClient.accessToken) driveClient.saveData('questions.json', questionsData);
    }
};

saveDriveBtn.onclick = () => {
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

