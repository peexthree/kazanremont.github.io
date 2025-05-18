document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    if (!form) return;

    // Валидация телефона
    const phoneInput = document.getElementById('client-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value.replace(/\D/g, '');
            if (value.length > 1) {
                let formattedValue = '+7 ';
                if (value.length > 1) {
                    formattedValue += '(' + value.slice(1, 4);
                    if (value.length > 4) {
                        formattedValue += ') ' + value.slice(4, 7);
                        if (value.length > 7) {
                            formattedValue += '-' + value.slice(7, 9);
                            if (value.length > 9) {
                                formattedValue += '-' + value.slice(9, 11);
                            }
                        }
                    }
                }
                phoneInput.value = formattedValue;
            } else {
                phoneInput.value = '';
            }
        });
    }

    // Обработка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('client-name');
        const phoneInput = document.getElementById('client-phone');
        const serviceInput = document.getElementById('client-service');

        const name = nameInput.value.trim();
        const phone = phoneInput.value.replace(/\D/g, '');
        const service = serviceInput.value;

        // Валидация телефона
        const phoneRegex = /^7\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        // Отправка данных
        const botToken = '8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro';
        const chatId = '5178416366';
        const text = `Новая заявка:
Имя: ${name}
Телефон: ${phone}
Услуга: ${service}`;

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        fetch(`https://api.telegram.org/bot ${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
            .then(response => {
                if (response.ok) {
                    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                    form.reset();
                } else {
                    throw new Error('Telegram API error');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке. Пожалуйста, напишите нам в Telegram @kazanremont_bot');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });

    // Таймер обратного отсчета
    const updateTimer = () => {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const diff = endOfDay - now;
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});
