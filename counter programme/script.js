const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const Heading = document.getElementById("Heading");

let count = 0;
increaseBtn.onclick = function () {
  count++;
  Heading.textContent = count;
};
decreaseBtn.onclick = function () {
  count--;
  Heading.textContent = count;
};
resetBtn.onclick = function () {
  count = 0;
  Heading.textContent = count;
};
