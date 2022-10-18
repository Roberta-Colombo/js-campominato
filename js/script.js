

const playBtn = document.getElementById('play-btn');

function play(){
    console.log("Start");
    const playfield = document.querySelector('.playfield');
    playfield.innerHTML = '';
    const level = document.getElementById('level').value;
    const bombsArray = [];

    let numOfSquares;
    switch(level){
        case '1':
        default: 
            numOfSquares = 100;
        break;  
        case '2':
            numOfSquares = 81;
        break;
        case '3':
            numOfSquares = 49;
        break;           
    }

    const NUM_BOMBS = 16; 

    function placeBombs(){
        while(bombsArray.length < NUM_BOMBS){
            const bomb = randomNumber(1, numOfSquares);
                if(!bombsArray.includes(bomb)){
                    bombsArray.push(bomb);  
                }
        }
        console.log(bombsArray);
    }
    placeBombs();
   
    let num;
    function createSquare(num){
        let squaresPerSide = Math.sqrt(numOfSquares);
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = ` calc(100% / ${squaresPerSide}) `;
        square.style.height = ` calc(100% / ${squaresPerSide}) `;
        square.innerHTML = `
        <span>${num}</span>
        `;
        
        square.addEventListener('click', function(){
            this.classList.add('clicked');
            console.log("Hai cliccato la cella nr." + num);
            if(bombsArray.includes(num)){
               this.classList.add('bomb');
            }
        })
        return square; 
    }
    createSquare(num);
    
    function createGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';
        for(let i = 1; i <= numOfSquares; i++){
            const square = createSquare(i);
            grid.appendChild(square);
        }
        playfield.appendChild(grid);
    }   
    createGrid();
}


playBtn.addEventListener('click', play);