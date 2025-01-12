// Hónapnevek
const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];

// Visszaszámlálási dátumok
const countdownDates = [
    { smonth: 1, month: 1, day: 12 },  // Január 15.
    { smonth: 2, month: 3, day: 5 }, // Február 10.
    { smonth: 3, month: 4, day: 5 }, // Március 20.
    { smonth: 4, month: 5, day: 5 }, // Április 25.
    { smonth: 5, month: 6, day: 5 },  // Május 5.
    { smonth: 6, month: 8, day: 5 }, // Június 30.
    { smonth: 7, month: 8, day: 5 }, // Július 15.
    { smonth: 8, month: 9, day: 5 }, // Augusztus 10.
    { smonth: 9, month: 10, day: 5 }, // Szeptember 25.
    { smonth: 10, month: 11, day: 5 }, // Október 20.
    { smonth: 11, month: 12, day: 5 },  // November 5.
    { smonth: 12, month: 12, day: 15 }  // December 31.
];

const highlightDiv = document.getElementById('highlight');

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
        }, 10000);
    }, 50);
}
function highlight(){
    highlightDiv.innerHTML = '';
    const now = new Date();
    let isFirstDate = true; // Ellenőrizni, hogy fizetésnap van-e
    let isPaymentDay = false; // Ellenőrizni, hogy fizetésnap van-e

    for (let i = 0; i < countdownDates.length; i++) {
        const { smonth, month, day } = countdownDates[i];
        const currentYear = now.getFullYear();
        const targetDate = new Date(currentYear, month - 1, day);

        const diff = targetDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (now < targetDate && isFirstDate) {
            highsmonth = monthNames[smonth - 1]
            highmonth = monthNames[month - 1]
            highday = day
            highdays = days
            highhours = hours
            highminutes = minutes
            highseconds = seconds
   
            isFirstDate = false;
        } else if (
            now.getFullYear() === targetDate.getFullYear() &&
            now.getMonth() === targetDate.getMonth() &&
            now.getDate() === targetDate.getDate() && isFirstDate
        ) {
            isPaymentDay = true;
            highsmonth = monthNames[smonth - 1]
            highmonth = monthNames[month - 1]
            highday = day
            // high.classList.add('first-date-salary');
            
        } 

        // highlightDiv.appendChild(high);

        if (!isFirstDate) {
            break;
        }
    }
    const high = document.createElement('div');
    high.className = 'highlight';
    high.classList.add('first-date');

    if (isPaymentDay) {
        high.innerHTML = `

        <h1>Fizetésnap!🎉</h1>
        <div class="image-container">
            <a href="https://www.ikea.com/hu/hu/" target="_blank">
                <img src="https://www.ikea.com/global/assets/logos/brand/ikea.svg" alt="Gyerünk vásárolni!">
            </a>
        </div>
        `;
    } else {

    high.innerHTML = `
             <h2>${highsmonth}i fizetés</h2>
             <h3>${highmonth} ${highday}.</h3>
             <p> másodperc</p>
         `;
    }

    highlightDiv.appendChild(high);

}


// Számlálók frissítése
function updateCounters() {
    countersDiv.innerHTML = '';
    const now = new Date();
    let isPaymentDay = false; // Ellenőrizni, hogy fizetésnap van-e

    countdownDates.forEach(({ smonth, month, day }) => {
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
                <h2>${monthNames[smonth - 1]}i fizetés</h2>
                <h3>${monthNames[month - 1]} ${day}. nap</h3>
                <h1>Fizetésnap!🎉</h1>
            `;
        } else if (now > targetDate) {
            counter.classList.add('paid');
            counter.innerHTML = `
                <h2>${monthNames[smonth - 1]}i fizetés</h2>
                <h3>${monthNames[month - 1]} ${day}. nap</h3>
                <p>Fizetve</p>
            `;
        } else {
            counter.innerHTML = `
                <h2>${monthNames[smonth - 1]}i fizetés</h2>
                <h3>${monthNames[month - 1]} ${day}. nap</h3>
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
setInterval(highlight, 1000);

updateCounters();
highlight();
