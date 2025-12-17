document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const responseBox = document.getElementById('responseBox');
    const statusText = document.getElementById('statusText');
    
    // Ответы бота для разных кнопок
    const botResponses = {
        help: "Я могу помочь вам с различными задачами:\n\n• Погода - узнать погоду в вашем городе\n• Новости - получить свежие новости\n• Калькулятор - выполнить математические вычисления\n• Шутки - развеселить вас\n• Настройки - настроить параметры бота",
        weather: "🌤️ Погода в Москве:\n• Температура: +18°C\n• Ощущается как: +16°C\n• Влажность: 65%\n• Ветер: 3 м/с\n• Состояние: Легкая облачность",
        news: "📰 Последние новости:\n1. Новые технологии в IT\n2. События в мире науки\n3. Культурные мероприятия\n4. Спортивные достижения",
        calc: "🧮 Калькулятор активирован!\nОтправьте математическое выражение (например: 2+2*3)",
        joke: "😂 Почему программисты путают Хэллоуин и Рождество?\n\nПотому что Oct 31 == Dec 25!",
        settings: "⚙️ Настройки бота:\n• Уведомления: Включены\n• Язык: Русский\n• Часовой пояс: UTC+3\n• Автоответ: Включен"
    };
    
    // Функция для отображения ответа
    function showResponse(response) {
        responseBox.innerHTML = `<p>${response.replace(/\n/g, '<br>')}</p>`;
        responseBox.style.animation = 'none';
        setTimeout(() => {
            responseBox.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
    
    // Обработчики кнопок
    document.getElementById('btnHelp').addEventListener('click', () => {
        showResponse(botResponses.help);
    });
    
    document.getElementById('btnWeather').addEventListener('click', () => {
        showResponse(botResponses.weather);
    });
    
    document.getElementById('btnNews').addEventListener('click', () => {
        showResponse(botResponses.news);
    });
    
    document.getElementById('btnCalc').addEventListener('click', () => {
        showResponse(botResponses.calc);
    });
    
    document.getElementById('btnJoke').addEventListener('click', () => {
        showResponse(botResponses.joke);
    });
    
    document.getElementById('btnSettings').addEventListener('click', () => {
        showResponse(botResponses.settings);
    });
    
    // Имитация подключения к боту
    setTimeout(() => {
        statusText.textContent = 'Бот онлайн';
        statusText.style.color = '#4CAF50';
        showResponse('👋 Привет! Я ваш Telegram бот. Выберите действие с помощью кнопок выше!');
    }, 1000);
    
    // Анимация при наведении на кнопки
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});