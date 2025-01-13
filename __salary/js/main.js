const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];

const countdownDates = [
    { smonth: 1, month: 2, day: 5 },
    { smonth: 2, month: 3, day: 5 },
    { smonth: 3, month: 4, day: 5 },
    { smonth: 4, month: 5, day: 5 },
    { smonth: 5, month: 6, day: 5 },
    { smonth: 6, month: 8, day: 5 },
    { smonth: 7, month: 8, day: 5 },
    { smonth: 8, month: 9, day: 5 },
    { smonth: 9, month: 10, day: 5 },
    { smonth: 10, month: 11, day: 5 },
    { smonth: 11, month: 12, day: 5 },
    { smonth: 12, month: 12, day: 15 }
];

const highlightDiv = document.getElementById('highlight');
const countersDiv = document.getElementById('counters');
const moneyRainDiv = document.getElementById('money-rain');

// Start money rain
function startMoneyRain() {
    setInterval(() => {
        const money = document.createElement('div');
        money.className = 'money';
        money.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        money.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random anim time
        money.style.animationDelay = `${Math.random()}s`; // Random delay
        moneyRainDiv.appendChild(money);

        // Autoremove of the elements
        setTimeout(() => {
            money.remove();
        }, 10000);
    }, 50);
}
function highlight(){
    highlightDiv.innerHTML = '';
    const now = new Date();
    let isFirstDate = true;
    let isPaymentDay = false;

    for (let i = 0; i < countdownDates.length; i++) {
        const { smonth, month, day } = countdownDates[i];
        const currentYear = now.getFullYear();
        const targetDate = new Date(currentYear, month - 1, day);

        const diff = targetDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (now < targetDate && isFirstDate) {
            highsmonth = monthNames[smonth - 1]
            highmonth = monthNames[month - 1]
            highday = day
            highdays = days
            highhours = hours
            highminutes = minutes
            break;
        } else if (
            now.getFullYear() === targetDate.getFullYear() &&
            now.getMonth() === targetDate.getMonth() &&
            now.getDate() === targetDate.getDate() && isFirstDate
        ) {
            isPaymentDay = true;
            highsmonth = monthNames[smonth - 1]
            highmonth = monthNames[month - 1]
            highday = day
            break;
        } 
    }
    const high = document.createElement('div');
    high.className = 'high';

    if (isPaymentDay) {
        high.classList.add('payment-day');
        high.innerHTML = `
        <h1>Fizetésnap!🎉</h1>
        <h2>Ma jön a ${highsmonth}i fizetés!</h2>
        <div class="image-container">
            <a href="https://www.ikea.com/hu/hu/" target="_blank">
                <img src="https://www.ikea.com/global/assets/logos/brand/ikea.svg" alt="Gyerünk vásárolni!">
            </a>
        </div>
        `;
    } else {
    high.innerHTML = `
                <h2>Következő fizetés nap</h2>
                <h1>${highdays} nap, ${highhours} óra, ${highminutes} perc múlva lesz,</h1>
                                <h2>${highmonth} hó ${highday}. napján.</h2>
            `;
    }
    highlightDiv.appendChild(high);
    
    // Start money rain if it is salary day
    if (isPaymentDay && !moneyRainDiv.classList.contains('active')) {
        moneyRainDiv.classList.add('active'); // Start only once
        startMoneyRain();
    }
}

function updateCounters() {
    countersDiv.innerHTML = '';
    const now = new Date();

    countdownDates.forEach(({ smonth, month, day }) => {
        const currentYear = now.getFullYear();
        const targetDate = new Date(currentYear, month - 1, day);

        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const counter = document.createElement('div');
        counter.className = 'counter';

        if (now <= targetDate.setDate(targetDate.getDate() + 1)) {
            if (days < 0){
                addHTML = `
                    <h3>0 nap van hátra</h3>
                `;
            } else {
                addHTML =  `
                <h3>${days} nap van hátra</h3>
                `;
            }
        
            counter.innerHTML = `
                <h2>${monthNames[smonth - 1]}i fizetés</h2>
                <p><u><b>Érkezik:</b></u> ${monthNames[month - 1]} hó ${day}. napján</p>
                ` + addHTML;
        } else {
            counter.classList.add('paid');
            counter.innerHTML = `
                <h2>${monthNames[smonth - 1]}i fizetés</h2>
                <h1>Fizetve!</h1>
            `;
        }
        countersDiv.appendChild(counter);
    });
}

// Refresh counter every 30 secounds
//setInterval(updateCounters, 30000);
setInterval(highlight, 300000);

updateCounters();
highlight();
