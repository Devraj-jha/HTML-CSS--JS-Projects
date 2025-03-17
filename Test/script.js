const newYears = "1 Jan 2026";

function countdown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();
  const totalSeconds = (newYearsDate - currentDate) / 1000;
  const days = math.floor(seconds / 3600 / 24);
  const hours = math.floor(seconds / 3600) % 24;
  console.log(days, hours);
}
