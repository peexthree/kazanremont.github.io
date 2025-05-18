// js/script.js

// Таймер
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const diff = endOfDay - now;

    document.getElementById('hours').textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

// Форма
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('client-phone');
    const serviceInput = document.getElementById('client-service');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.replace(/\D/g, '');
    const service = serviceInput.value;

    const botToken = '8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro';
    const chatId = '5178416366';

    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nУслуга: ${service}`;

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    fetch(`https://api.telegram.org/bot ${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
        .then(response => {
            if (response.ok) {
                alert('Заявка отправлена!');
                this.reset();
            } else {
                throw new Error('Telegram error');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка. Пожалуйста, напишите нам в Telegram.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Telegram WebApp
function showTelegramApp() {
    const tgApp = document.getElementById('tg-app');
    tgApp.style.display = 'block';
    window.scrollTo({ top: tgApp.offsetTop, behavior: 'smooth' });
}
