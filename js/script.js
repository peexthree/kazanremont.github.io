// Отправка формы в Telegram-бота
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    
    // Отправка в бота
    fetch(`https://api.telegram.org/bot8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro/sendMessage?chat_id=5178416366&text=Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}`);
    
    // Очистка формы
    this.reset();
    alert('Заявка отправлена! Мастер свяжется с вами в течение 5 минут.');
});
