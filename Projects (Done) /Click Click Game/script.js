const gamearea = document.getElementById("gameArea")
const scoreB = document.getElementById('score')
//box to click 
const box = document.createElement('div');
let score = 0;
box.style.width = '50px';
box.style.height = '50px';
box.style.backgroundColor = 'red';
box.style.position = 'absolute';

  function moveBox() {
        const maxX = gameArea.clientWidth - 50;  
        const maxY = gameArea.clientHeight - 50;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        box.style.left = randomX + 'px';
        box.style.top = randomY + 'px';
    }

    box.addEventListener('mouseover', ()=>{
        score++;
        scoreB.textContent = score;

        moveBox()
    })

    gamearea.appendChild(box)

    