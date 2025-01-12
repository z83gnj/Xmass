// Hónapnevek
const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];

// Visszaszámlálási dátumok
const countdownDates = [
    { smonth: 1, month: 1, day: 13 },  // Január 15.
    { smonth: 2, month: 2, day: 10 }, // Február 10.
    { smonth: 3, month: 3, day: 20 }, // Március 20.
    { month: 4, day: 25 }, // Április 25.
    { month: 5, day: 5 },  // Május 5.
    { month: 6, day: 30 }, // Június 30.
    { month: 7, day: 15 }, // Július 15.
    { month: 8, day: 10 }, // Augusztus 10.
    { month: 9, day: 25 }, // Szeptember 25.
    { month: 10, day: 20 }, // Október 20.
    { month: 11, day: 5 },  // November 5.
    { month: 12, day: 31 }  // December 31.
];

const countersDiv = document.getElementById('counters');
const moneyRainDiv = document.getElementById('money-rain');

// Folyamatos pénzeső indítása
function startMoneyRain() {
    setInterval(() => {
        const money = document.createElement('div');
        money.className = 'money';
        money.style.left = `${Math.random() * 100}vw`; // Véletlenszerű vízszintes pozíció
        money.style.animationDuration = `${Math.random() * 2 + 3}s`; // Véletlenszerű animációs idő
        money.style.animationDelay = `${Math.random()}s`; // Véletlenszerű késleltetés
        moneyRainDiv.appendChild(money);

        // Az elemek automatikusan eltávolításra kerülnek
        setTimeout(() => {
            money.remove();
        }, 5000);
    }, 300);
}

// Számlálók frissítése
function updateCounters() {
    countersDiv.innerHTML = '';
    const now = new Date();
    let isPaymentDay = false; // Ellenőrizni, hogy fizetésnap van-e

    countdownDates.forEach(({ month, day }) => {
        const currentYear = now.getFullYear();
        const targetDate = new Date(currentYear, month - 1, day);

        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const counter = document.createElement('div');
        counter.className = 'counter';

        if (
            now.getFullYear() === targetDate.getFullYear() &&
            now.getMonth() === targetDate.getMonth() &&
            now.getDate() === targetDate.getDate()
        ) {
            isPaymentDay = true; // Fizetésnap van
            counter.classList.add('payment-day');
            counter.innerHTML = `
                <h2>${monthNames[month - 1]} ${day}. nap</h2>
                <p>Fizetésnap!</p>
            `;
        } else if (now > targetDate) {
            counter.classList.add('paid');
            counter.innerHTML = `
                <h2>${monthNames[month - 1]} ${day}. nap</h2>
                <p>Fizetve</p>
            `;
        } else {
            counter.innerHTML = `
                <h2>${monthNames[month - 1]} ${day}. nap</h2>
                <p>${days} nap, ${hours} óra, ${minutes} perc, ${seconds} másodperc</p>
            `;
        }

        countersDiv.appendChild(counter);
    });

    // Pénzeső indítása csak fizetésnapon
    if (isPaymentDay && !moneyRainDiv.classList.contains('active')) {
        moneyRainDiv.classList.add('active'); // Egyszer indítsuk el
        startMoneyRain();
    }
}

// Számlálók frissítése minden másodpercben
setInterval(updateCounters, 1000);
updateCounters();
