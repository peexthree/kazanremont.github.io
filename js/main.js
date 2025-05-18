// Раскрытие/сворачивание аккордеона
document.querySelector('.accordion-expand-all').addEventListener('click', function() {
    const allDetails = document.querySelectorAll('.case-details');
    const isAnyOpen = [...allDetails].some(detail => detail.open);
    
    allDetails.forEach(detail => {
        detail.open = !isAnyOpen;
    });
    
    this.textContent = isAnyOpen ? 'Развернуть все кейсы' : 'Свернуть все кейсы';
});

// Таймер обратного отсчета
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// Обработка формы
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const service = document.getElementById('client-service').value;

    if (!name || !phone || !service) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const botToken = '8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro';
    const chatId = '5178416366';
    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nУслуга: ${service}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
        .then(response => {
            if (response.ok) {
                alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            } else {
                throw new Error('Ошибка отправки');
            }
        })
        .catch(() => {
            alert('Ошибка при отправке. Пожалуйста, напишите нам в Telegram.');
        });
});

// Маска для телефона
document.getElementById('client-phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});
