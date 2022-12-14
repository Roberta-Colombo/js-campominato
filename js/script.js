/* Consegna:
X L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
X Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
X I numeri nella lista delle bombe non possono essere duplicati.
X In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
X La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
X 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
X 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */



const playBtn = document.getElementById('play-btn');

function play(){
    const messageDiv = document.querySelector('.message');
    messageDiv.innerHTML = '';
    console.log("Start");
    const playfield = document.querySelector('.playfield');
    playfield.innerHTML = '';
    const level = document.getElementById('level').value;
    const bombsArray = [];
    let score = 0;

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
    const maxAttempts = (numOfSquares - NUM_BOMBS);
    console.log(maxAttempts);

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
        <span class="square-text">${num}</span>
        `;
        
        square.addEventListener('click', result);

        function result(){
            square.removeEventListener('click', result);
            score++;
            console.log(score);
            this.classList.add('clicked');
            this.innerHTML = `
            <span class="icon-size"><i class="fa-solid fa-pizza-slice"></i>
            `
            // console.log("Hai cliccato la cella nr." + num);
            
            if(bombsArray.includes(num)){
                score--;
                this.classList.add('bomb');
                this.innerHTML = `
                <span class="icon-size"><i class="fa-regular fa-face-dizzy"></i></span>
               `
                gameOver();
            }
        } 
        return square;  
    }
    createSquare(num);

    function gameOver(){
        const scoreMessage = document.createElement('div');
        messageDiv.append(scoreMessage);
        scoreMessage.innerHTML = `
        <span class="message-text">Il tuo punteggio è: ${score}.</span>  
        `;
        // per rendere impossibile cliccare altre caselle dopo il game over:
        const blockedSquares = document.getElementsByClassName("square");
        console.log(blockedSquares);
                       
        for(let i = 0; i < blockedSquares.length; i++){
            blockedSquares[i].classList.add('unclickable');
            let num = i+1;
            // i+1 perche i numeri partono da 1, ma l'array parte da 0;
            if(bombsArray.includes(num)){
                blockedSquares[i].classList.add('bomb');
                blockedSquares[i].innerHTML = `
               <span class="icon-size"><i class="fa-regular fa-face-dizzy"></i></span>
               `
            }
        }

        if(score === maxAttempts){
            scoreMessage.innerHTML += `
            <span class="message-text">Hai vinto!&ast;</span>
            `
            // console.log('hai vinto!');
        }
        else{
            scoreMessage.innerHTML += `
            <span class="message-text">Hai mangiato troppo :(</span>
            `
            // console.log('hai perso');
        }
    }
    
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