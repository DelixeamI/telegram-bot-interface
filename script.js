document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const responseBox = document.getElementById('responseBox');
    const statusText = document.getElementById('statusText');
    const selectedGenresCount = document.getElementById('selected-genres-count');
    const selectedMode = document.getElementById('selected-mode');
    const selectedTagsContainer = document.getElementById('selected-tags-container');
    const totalGames = document.getElementById('total-games');
    const foundGames = document.getElementById('found-games');
    const selectedCount = document.getElementById('selected-count');
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    
    // Жанры для кнопок
    const GENRES = [
        "🎮 Экшен",
        "🧩 Головоломки",
        "🎲 Ролевые (RPG)",
        "🚀 Стратегии",
        "🏎️ Гонки",
        "🔫 Шутеры",
        "🌍 Открытый мир",
        "👻 Хоррор",
        "🎯 Спортивные",
        "🎵 Музыкальные"
    ];
    
    // База данных игр
    const GAMES_DATABASE = [
        // 🎮 Экшен
        {name: "Grand Theft Auto V", genres: ["🎮 Экшен", "🌍 Открытый мир"], mode: "🔀 Оба варианта", description: "Знаменитая игра в открытом мире с криминальным сюжетом", playtime: "60-100 часов"},
        {name: "The Witcher 3: Wild Hunt", genres: ["🎮 Экшен", "🎲 Ролевые (RPG)", "🌍 Открытый мир"], mode: "🎮 Синглплеер", description: "Эпическая RPG с богатым миром и захватывающим сюжетом", playtime: "100+ часов"},
        {name: "Cyberpunk 2077", genres: ["🎮 Экшен", "🎲 Ролевые (RPG)", "🌍 Открытый мир"], mode: "🎮 Синглплеер", description: "Футуристическая RPG в мире киберпанка", playtime: "60-80 часов"},
        
        // 🧩 Головоломки
        {name: "Portal 2", genres: ["🧩 Головоломки", "🎮 Экшен"], mode: "🔀 Оба варианта", description: "Культовая головоломка с порталами и физикой", playtime: "8-10 часов"},
        {name: "The Witness", genres: ["🧩 Головоломки"], mode: "🎮 Синглплеер", description: "Исследовательская головоломка на загадочном острове", playtime: "40-50 часов"},
        {name: "Baba Is You", genres: ["🧩 Головоломки"], mode: "🎮 Синглплеер", description: "Инновационная головоломка, где ты меняешь правила игры", playtime: "20-30 часов"},
        
        // 🎲 Ролевые (RPG)
        {name: "Skyrim", genres: ["🎲 Ролевые (RPG)", "🌍 Открытый мир"], mode: "🎮 Синглплеер", description: "Легендарная RPG с огромным миром для исследований", playtime: "100+ часов"},
        {name: "Divinity: Original Sin 2", genres: ["🎲 Ролевые (RPG)", "🚀 Стратегии"], mode: "🔀 Оба варианта", description: "Глубокая тактическая RPG с богатым выбором", playtime: "80-100 часов"},
        {name: "Mass Effect Legendary Edition", genres: ["🎲 Ролевые (RPG)", "🔫 Шутеры"], mode: "🎮 Синглплеер", description: "Эпическая космическая сага с выбором, влияющим на сюжет", playtime: "100+ часов"},
        
        // 🚀 Стратегии
        {name: "Civilization VI", genres: ["🚀 Стратегии"], mode: "🔀 Оба варианта", description: "Построй свою империю и пройди путь от каменного века до будущего", playtime: "Бесконечно"},
        {name: "StarCraft II", genres: ["🚀 Стратегии"], mode: "🔀 Оба варианта", description: "Культовая космическая стратегия в реальном времени", playtime: "30-50 часов"},
        {name: "XCOM 2", genres: ["🚀 Стратегии", "🎲 Ролевые (RPG)"], mode: "🎮 Синглплеер", description: "Тактическая стратегия о сопротивлении инопланетному вторжению", playtime: "40-60 часов"},
        
        // 🏎️ Гонки
        {name: "Forza Horizon 5", genres: ["🏎️ Гонки", "🎯 Спортивные"], mode: "🔀 Оба варианта", description: "Красочные гонки в открытом мире Мексики", playtime: "50+ часов"},
        {name: "Mario Kart 8 Deluxe", genres: ["🏎️ Гонки"], mode: "🔀 Оба варианта", description: "Веселые аркадные гонки с персонажами Nintendo", playtime: "20-30 часов"},
        {name: "Need for Speed: Heat", genres: ["🏎️ Гонки", "🎮 Экшен"], mode: "🎮 Синглплеер", description: "Ночные уличные гонки с полицией", playtime: "15-20 часов"},
        
        // 🔫 Шутеры
        {name: "Call of Duty: Warzone", genres: ["🔫 Шутеры"], mode: "🌐 Мультиплеер", description: "Бесплатный королевская битва от создателей Call of Duty", playtime: "Бесконечно"},
        {name: "Counter-Strike 2", genres: ["🔫 Шутеры"], mode: "🌐 Мультиплеер", description: "Классический тактический шутер", playtime: "Бесконечно"},
        {name: "DOOM Eternal", genres: ["🔫 Шутеры", "🎮 Экшен"], mode: "🎮 Синглплеер", description: "Безумный шутер с уничтожением демонов", playtime: "15-20 часов"},
        
        // 🌍 Открытый мир
        {name: "Red Dead Redemption 2", genres: ["🌍 Открытый мир", "🎮 Экшен"], mode: "🔀 Оба варианта", description: "Эпический вестерн с огромным живым миром", playtime: "60-80 часов"},
        {name: "The Legend of Zelda: Breath of the Wild", genres: ["🌍 Открытый мир", "🎮 Экшен"], mode: "🎮 Синглплеер", description: "Исследуй огромный мир Хайрула", playtime: "50-100 часов"},
        {name: "Elden Ring", genres: ["🌍 Открытый мир", "🎮 Экшен", "🎲 Ролевые (RPG)"], mode: "🔀 Оба варианта", description: "Сложная RPG с огромным миром для исследований", playtime: "80-120 часов"},
        
        // 👻 Хоррор
        {name: "Resident Evil 4 Remake", genres: ["👻 Хоррор", "🎮 Экшен"], mode: "🎮 Синглплеер", description: "Обновленная классика survival horror", playtime: "15-20 часов"},
        {name: "Outlast", genres: ["👻 Хоррор"], mode: "🎮 Синглплеер", description: "Ужасы выживания в психбольнице", playtime: "6-8 часов"},
        {name: "Phasmophobia", genres: ["👻 Хоррор"], mode: "🌐 Мультиплеер", description: "Кооперативный хоррор об охоте на призраков", playtime: "Бесконечно"},
        
        // 🎯 Спортивные
        {name: "FIFA 23", genres: ["🎯 Спортивные"], mode: "🔀 Оба варианта", description: "Самый популярный футбольный симулятор", playtime: "Бесконечно"},
        {name: "Rocket League", genres: ["🎯 Спортивные", "🏎️ Гонки"], mode: "🌐 Мультиплеер", description: "Футбол на ракетных автомобилях", playtime: "Бесконечно"},
        {name: "NBA 2K23", genres: ["🎯 Спортивные"], mode: "🔀 Оба варианта", description: "Реалистичный баскетбольный симулятор", playtime: "Бесконечно"},
        
        // 🎵 Музыкальные
        {name: "Beat Saber", genres: ["🎵 Музыкальные", "🎮 Экшен"], mode: "🎮 Синглплеер", description: "Ритм-игра в VR где ты рубишь кубы саблями", playtime: "20+ часов"},
        {name: "Guitar Hero III", genres: ["🎵 Музыкальные"], mode: "🔀 Оба варианта", description: "Культовая игра на гитарном контроллере", playtime: "10-15 часов"},
        {name: "Just Dance 2023", genres: ["🎵 Музыкальные", "🎯 Спортивные"], mode: "🔀 Оба варианта", description: "Танцевальная вечеринка с современными хитами", playtime: "10+ часов"}
    ];
    
    // Состояние приложения
    const state = {
        selectedGenres: [],
        selectedMode: null,
        recommendedGames: []
    };
    
    // Функция для отображения ответа бота
    function showResponse(response) {
        responseBox.innerHTML = `<p>${response.replace(/\n/g, '<br>')}</p>`;
        responseBox.style.animation = 'none';
        setTimeout(() => {
            responseBox.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
    
    // Функция обновления статистики
    function updateStats() {
        selectedGenresCount.textContent = state.selectedGenres.length;
        selectedCount.textContent = state.selectedGenres.length;
        totalGames.textContent = GAMES_DATABASE.length;
        
        if (state.recommendedGames.length > 0) {
            foundGames.textContent = state.recommendedGames.length;
        }
    }
    
    // Функция обновления выбранных тегов
    function updateSelectedTags() {
        selectedTagsContainer.innerHTML = '';
        
        state.selectedGenres.forEach(genre => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `
                ${genre}
                <span class="remove" data-genre="${genre}">×</span>
            `;
            
            tag.querySelector('.remove').addEventListener('click', function(e) {
                e.stopPropagation();
                removeGenre(genre);
            });
            
            selectedTagsContainer.appendChild(tag);
        });
        
        updateStats();
    }
    
    // Функция удаления жанра
    function removeGenre(genre) {
        const index = state.selectedGenres.indexOf(genre);
        if (index !== -1) {
            state.selectedGenres.splice(index, 1);
            
            // Снимаем выделение с кнопки жанра
            document.querySelectorAll('.genre-btn').forEach(btn => {
                if (btn.textContent === genre) {
                    btn.classList.remove('selected');
                }
            });
            
            updateSelectedTags();
        }
    }
    
    // Функция переключения выбора жанра
    function toggleGenreSelection(genre) {
        const index = state.selectedGenres.indexOf(genre);
        
        if (index === -1) {
            state.selectedGenres.push(genre);
        } else {
            state.selectedGenres.splice(index, 1);
        }
        
        // Обновляем выделение кнопки
        document.querySelectorAll('.genre-btn').forEach(btn => {
            if (btn.textContent === genre) {
                btn.classList.toggle('selected');
            }
        });
        
        updateSelectedTags();
    }
    
    // Функция выбора режима игры
    function selectMode(mode) {
        state.selectedMode = mode;
        
        // Обновляем визуальное выделение кнопок
        document.querySelectorAll('.mode-btn').forEach(button => {
            if (button.dataset.mode === mode) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
        
        // Обновляем отображение выбранного режима
        const modeLabels = {
            'single': '🎮 Синглплеер',
            'multi': '🌐 Мультиплеер',
            'both': '🔀 Оба варианта'
        };
        selectedMode.textContent = modeLabels[mode] || 'Не выбран';
        
        updateStats();
    }
    
    // Функция поиска игр
    function findGames() {
        // Проверяем, что выбраны жанры и режим
        if (state.selectedGenres.length === 0) {
            showResponse('❌ Пожалуйста, выбери хотя бы один жанр!\n\nНажми на кнопки с жанрами в разделе "Выбери жанры игр"');
            return;
        }
        
        if (!state.selectedMode) {
            showResponse('❌ Пожалуйста, выбери режим игры!\n\nНажми на одну из кнопок в разделе "Выбери режим игры"');
            return;
        }
        
        // Получаем выбранный режим в нужном
    }
})
