let count = 0;

const counter = document.getElementById("count")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")
const reset = document.getElementById("reset")

increase.addEventListener('click', function(){
    count++;
    counter.textContent = count;
})
decrease.addEventListener('click', function(){
    count--;
    counter.textContent = count;
})
reset.addEventListener('click', function(){
    count++;
    counter.textContent = 0;
})
