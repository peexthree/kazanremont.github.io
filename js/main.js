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
document.getElementById("masterForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const token = "8104403306:AAEH9qUcQaoryZV7Ws9HB0AEqp_sdOgrbro";
    const chatId = "5178416366";
    const name = this.name.value.trim();
    const phone = this.phone.value.trim();

    // Проверка заполнения полей
    if (!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    const text = `📌 Новая заявка на ремонт!\nИмя: ${name}\nТелефон: ${phone}\n\nСайт: kazanremont.github.io`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "HTML"
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            alert("✅ Заявка отправлена! Мастер свяжется с вами в течение 10 минут.");
            this.reset();
        } else {
            throw new Error(data.description || "Ошибка отправки");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert(`❌ Ошибка отправки! Пожалуйста, напишите нам напрямую в Telegram: https://t.me/kazanremont\n\n${error.message}`);
    }
});
