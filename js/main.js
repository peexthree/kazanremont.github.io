// js/main.js

// === Таймер ===
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const diff = endOfDay - now;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Обновление таймера раз в секунду
if (document.getElementById('countdown')) {
    setInterval(updateTimer, 1000);
    updateTimer();
}

// === Форма ===
const form = document.getElementById('order-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.clientName.value.trim();
        const phone = this.clientPhone.value.trim();
        const service = this.clientService.value;

        const botToken = '8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro';
        const chatId = '5178416366';

        const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nУслуга: ${service}`;

        fetch(`https://api.telegram.org/bot ${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
            .then(res => res.json())
            .then(data => {
                alert('Заявка отправлена!');
                form.reset();
            })
            .catch(() => {
                alert('Ошибка. Напишите нам напрямую.');
            });
    });
}

// === Раскрытие кейсов ===
const expandBtn = document.querySelector('.accordion-expand-all');
if (expandBtn) {
    expandBtn.addEventListener('click', () => {
        const details = document.querySelectorAll('.case-details');
        details.forEach(detail => detail.setAttribute('open', true));
    });
}
