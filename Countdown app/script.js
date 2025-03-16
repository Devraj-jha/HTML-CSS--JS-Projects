// Set the target date for New Year's Eve (midnight of December 31, 2025)
const targetDate = new Date("2025-12-31T23:59:59").getTime();

// Update the countdown every second
const countdownTimer = setInterval(function () {
  // Get the current time
  const now = new Date().getTime();

  // Find the difference between now and the target date
  const distance = targetDate - now;

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the console (You can replace this with your own DOM updates)
  console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownTimer);
    console.log("Happy New Year!");
  }
}, 1000);
