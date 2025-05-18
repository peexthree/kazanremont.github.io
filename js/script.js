// Инициализация анимаций
new WOW().init();

// Отправка формы в Telegram
document.querySelector('.lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(`https://api.telegram.org/bot8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro/sendMessage?chat_id=5178416366&text=Новая заявка`);
});