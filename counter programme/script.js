const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const Heading = document.getElementById("Heading");

let count = 0;

// Function to remove animation classes after the animation ends
const removeAnimationClasses = () => {
  Heading.classList.remove("fire-effect", "ice-effect");
};

// Increase button
increaseBtn.onclick = function () {
  count++;
  Heading.textContent = count;

  // Remove ice effect if present and add fire effect
  Heading.classList.remove("ice-effect");
  Heading.classList.add("fire-effect");

  // Remove the fire effect after the animation ends
  Heading.addEventListener("animationend", removeAnimationClasses, {
    once: true,
  });
};

// Decrease button
decreaseBtn.onclick = function () {
  count--;
  Heading.textContent = count;

  // Remove fire effect if present and add ice effect
  Heading.classList.remove("fire-effect");
  Heading.classList.add("ice-effect");

  // Remove the ice effect after the animation ends
  Heading.addEventListener("animationend", removeAnimationClasses, {
    once: true,
  });
};

// Reset button
resetBtn.onclick = function () {
  count = 0;
  Heading.textContent = count;

  // Remove both fire and ice effects
  Heading.classList.remove("fire-effect", "ice-effect");
};
