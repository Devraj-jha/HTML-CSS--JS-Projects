let btn = document.getElementById("btn");
let btn2 = document.getElementById("btn2");

let display = document.getElementById("display")

let

function changecontent(){
  let value1 = Number(btn.value);
  let value2 = Number(btn2.value);

  // Compare the values and update the display
  if (value1 > value2) {
    display.innerHTML = "A > B";
  } else if (value1 < value2) {
    display.innerHTML = "A < B";
  } else {
    display.innerHTML = "A = B";
  }}
