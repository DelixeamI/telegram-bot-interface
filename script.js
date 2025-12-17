// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
if (tg) {
    tg.expand(); // Раскрываем на весь экран
    tg.enableClosingConfirmation(); // Подтверждение закрытия
}

// Данные игр (можно расширить)
const gamesDatabase = [
    { name: "Cyberpunk 2077", genres: ["rpg", "action"], mode: "single" },
    { name: "The Witcher 3", genres: ["rpg", "adventure"], mode: "single" },
    { name: "Counter-Strike 2", genres: ["shooter", "action"], mode: "multi" },
    { name: "Dota 2", genres: ["strategy", "moba"], mode: "multi" },
    { name: "Minecraft", genres: ["sandbox", "adventure"], mode: "coop" },
    { name: "Stardew Valley", genres: ["simulator", "indie"], mode: "coop" },
    { name: "Resident Evil 4", genres: ["horror", "action"], mode: "single" },
    { name: "Overwatch 2", genres: ["shooter", "action"], mode: "multi" },
    { name: "It Takes Two", genres: ["adventure", "platformer"], mode: "coop" },
    { name: "FIFA 24", genres: ["sport", "simulator"], mode: "multi" }
];

// Жанры для кнопок
const genresList = [
    { id: "action", name: "Экшен" },
    { id: "rpg", name: "РПГ" },
    { id: "strategy", name: "Стратегия" },
    { id: "indie", name: "Инди" },
    { id: "adventure", name: "Приключения" },
    { id: "horror", name: "Хоррор" },
    { id: "simulator", name: "Симулятор" },
    { id: "sport", name: "Спорт" },
    { id: "sandbox", name: "Песочница" },
    { id: "shooter", name: "Шутер" },
    { id: "moba", name: "MOBA" },
    { id: "platformer", name: "Платформер" }
];

// Состояние
let selectedGenres = [];
let selectedMode = null;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderGenres();
    setupEventListeners();
    updateUI();
});

// Рендерим кнопки жанров
function renderGenres() {
    const grid = document.getElementById('genres-grid');
    grid.innerHTML = '';
    
    genresList.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'genre-btn';
        button.dataset.id = genre.id;
        button.textContent = genre.name;
        grid.appendChild(button);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Жанры
    document.getElementById('genres-grid').addEventListener('click', function(e) {
        if (e.target.classList.contains('genre-btn')) {
            toggleGenre(e.target.dataset.id);
        }
    });
    
    // Режимы игры
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectMode(this.dataset.mode);
        });
    });
    
    // Кнопка "Найти игру!"
    document.getElementById('done-btn').addEventListener('click', findGames);
}

// Переключение жанра
function toggleGenre(genreId) {
    const index = selectedGenres.indexOf(genreId);
    const button = document.querySelector(`.genre-btn[data-id="${genreId}"]`);
    
    if (index === -1) {
        selectedGenres.push(genreId);
        button.classList.add('selected');
    } else {
        selectedGenres.splice(index, 1);
        button.classList.remove('selected');
    }
    
    updateUI();
}

// Выбор режима игры
function selectMode(mode) {
    selectedMode = mode;
    
    // Снимаем выделение со всех кнопок режима
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Выделяем выбранный режим
    const selectedBtn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
    
    updateUI();
}

// Обновление интерфейса
function updateUI() {
    // Обновляем счётчик жанров
    const countElement = document.getElementById('selected-count');
    countElement.textContent = selectedGenres.length;
    
    // Обновляем режим игры
    const modeElement = document.getElementById('game-mode');
    if (selectedMode) {
        const modeNames = {
            single: "Соло",
            multi: "Мультиплеер",
            coop: "Кооператив"
        };
        modeElement.textContent = modeNames[selectedMode] || selectedMode;
        modeElement.style.color = "#00cec9";
    } else {
        modeElement.textContent = "Не выбран";
        modeElement.style.color = "";
    }
    
    // Обновляем кнопку "Найти игру!"
    const doneBtn = document.getElementById('done-btn');
    const countSpan = doneBtn.querySelector('.btn-count');
    
    countSpan.textContent = `(${selectedGenres.length})`;
    
    // Активируем кнопку, если выбран хотя бы один жанр
    doneBtn.disabled = selectedGenres.length === 0;
}

// Поиск игр по выбранным параметрам
function findGames() {
    if (selectedGenres.length === 0) return;
    
    // Фильтруем игры
    let filteredGames = gamesDatabase.filter(game => {
        // Проверяем жанры
        const hasGenre = selectedGenres.some(genre => 
            game.genres.includes(genre)
        );
        
        // Проверяем режим (если выбран)
        const hasMode = !selectedMode || game.mode === selectedMode;
        
        return hasGenre && hasMode;
    });
    
    // Если ничего не найдено, показываем все игры выбранных жанров
    if (filteredGames.length === 0) {
        filteredGames = gamesDatabase.filter(game => 
            selectedGenres.some(genre => game.genres.includes(genre))
        );
    }
    
    // Показываем результаты
    showResults(filteredGames);
    
    // Отправляем данные в Telegram (если бот подключен)
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'game_search',
            genres: selectedGenres,
            mode: selectedMode,
            found_games: filteredGames.length,
            timestamp: new Date().toISOString()
        }));
    }
}

// Показ результатов
function showResults(games) {
    const resultsElement = document.getElementById('results');
    const gamesListElement = document.getElementById('games-list');
    
    // Очищаем предыдущие результаты
    gamesListElement.innerHTML = '';
    
    if (games.length === 0) {
        gamesListElement.innerHTML = `
            <div class="game-item">
                <div class="game-name">😕 Не найдено игр</div>
                <div class="game-info">Попробуйте выбрать другие жанры</div>
            </div>
        `;
    } else {
        // Добавляем найденные игры
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.className = 'game-item';
            gameElement.innerHTML = `
                <div class="game-name">${game.name}</div>
                <div class="game-info">
                    <span>${getGenresText(game.genres)}</span>
                    <span>${getModeText(game.mode)}</span>
                </div>
            `;
            gamesListElement.appendChild(gameElement);
        });
    }
    
    // Показываем блок результатов
    resultsElement.style.display = 'block';
    
    // Прокручиваем к результатам
    resultsElement.scrollIntoView({ behavior: 'smooth' });
}

// Вспомогательные функции
function getGenresText(genresArray) {
    const genreMap = {
        action: "Экшен",
        rpg: "РПГ",
        strategy: "Стратегия",
        indie: "Инди",
        adventure: "Приключения",
        horror: "Хоррор",
        simulator: "Симулятор",
        sport: "Спорт",
        sandbox: "Песочница",
        shooter: "Шутер",
        moba: "MOBA",
        platformer: "Платформер"
    };
    
    return genresArray.map(g => genreMap[g] || g).join(", ");
}

function getModeText(mode) {
    const modeMap = {
        single: "👤 Соло",
        multi: "👥 Мультиплеер",
        coop: "🤝 Кооп"
    };
    
    return modeMap[mode] || mode;
}

// Сохранение в LocalStorage (чтобы не терять выбор при обновлении)
function saveSelection() {
    localStorage.setItem('gameBot_selection', JSON.stringify({
        genres: selectedGenres,
        mode: selectedMode
    }));
}

function loadSelection() {
    const saved = localStorage.getItem('gameBot_selection');
    if (saved) {
        const data = JSON.parse(saved);
        selectedGenres = data.genres || [];
        selectedMode = data.mode || null;
        
        // Восстанавливаем визуальное состояние
        selectedGenres.forEach(genreId => {
            const btn = document.querySelector(`.genre-btn[data-id="${genreId}"]`);
            if (btn) btn.classList.add('selected');
        });
        
        if (selectedMode) {
            const modeBtn = document.querySelector(`.mode-btn[data-mode="${selectedMode}"]`);
            if (modeBtn) modeBtn.classList.add('selected');
        }
        
        updateUI();
    }
}

// Загружаем сохранённый выбор
window.addEventListener('load', loadSelection);

// Сохраняем при изменении
window.addEventListener('beforeunload', saveSelection);