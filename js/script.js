// Таймер обратного отсчета
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const diff = endOfDay - now;

    document.getElementById('hours').textContent = String(Math.floor(diff / (1000 * 60 * 60)) % 24).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

// Инфинити скролл
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loadMoreContent();
    }
});

let loadCount = 0;

function loadMoreContent() {
    const items = [
        { title: "Замена экрана", image: "images/3.jpg", text: "Профессиональная замена экрана за 20 минут. Используем только оригинальные запчасти." },
        { title: "Замена батареи", image: "images/4.jpg", text: "Новый аккумулятор — как новый телефон. Увеличенный срок службы." },
        { title: "Ремонт после воды", image: "images/5.jpg", text: "Чистка платы, удаление коррозии, восстановление функциональности." },
        { title: "Гарантия", image: "images/11.jpg", text: "Официальная гарантия на любую услугу — до 2 лет." },
        { title: "Оригинальные запчасти", image: "images/12.jpg", text: "Только проверенные поставщики. Заводские комплектующие." },
        { title: "Выезд мастера", image: "images/13.jpg", text: "Приезжаем в течение 40 минут в любой район Казани." },
        { title: "Диагностика", image: "images/14.jpg", text: "Бесплатная диагностика. Точное определение неисправностей." },
    ];

    const infiniteScroll = document.getElementById("infinite-scroll");

    for (let i = 0; i < items.length; i++) {
        const item = items[(loadCount + i) % items.length];
        const div = document.createElement("div");
        div.className = "infinite-item";
        div.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="${item.title}" width="100%" height="auto" loading="lazy">
            <p>${item.text}</p>
        `;
        infiniteScroll.appendChild(div);
    }
    loadCount += items.length;
}

loadMoreContent();
