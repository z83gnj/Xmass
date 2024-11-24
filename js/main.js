// JavaScript to set a Christmas countdown timer
function Countdown() {

	const christmasDate = new Date("Dec 25, 2024 00:00:00").getTime();

	const x = setInterval(function () {
		const now = new Date().getTime();
		const distance = christmasDate - now;

		// If the countdown has reached or passed Christmas, redirect to another page
		// const limit = (50 * (1000 * 60 * 60 * 24))
		if (distance <= 0) {
			clearInterval(x);
			window.location.href = "xmass.html"; // Replace with the URL of the other page
		}
		else {
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			document.getElementById("days").innerHTML = days;
			document.getElementById("hours").innerHTML = hours;
			document.getElementById("minutes").innerHTML = minutes;
			document.getElementById("seconds").innerHTML = seconds;
            	}
        }, 1000);
}
function Snowfall() {

	const snowfallContainer = document.body
	for (let i = 0; i < 50; i++) {
           	const snowflake = document.createElement("div");
            	snowflake.classList.add("snowflake");
            	snowflake.style.left = `${Math.random() * 100}vw`;
            	snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            	snowfallContainer.appendChild(snowflake);
        }
}
Countdown();
Snowfall();
