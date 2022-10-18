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
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */



const playBtn = document.getElementById('play-btn');

function play(){
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
        <span>${num}</span>
        `;
        
        square.addEventListener('click', result);

        function result(){
            square.removeEventListener('click', result);
            score++;
            console.log(score);
            this.classList.add('clicked');
            this.innerHTML = `
            <span><i class="fa-solid fa-martini-glass-citrus"></i>
            `
            console.log("Hai cliccato la cella nr." + num);
            
            if(bombsArray.includes(num)){
               this.classList.add('bomb');
               this.innerHTML = `
               <span><i class="fa-regular fa-face-dizzy"></i></span>
               `
                gameOver();

                const blockedSquares = document.getElementsByClassName("square");
                console.log(blockedSquares);
                
                while(blockedSquares <= square){
                    blockedSquares[i].classList.add('unclickable');
                }
                    
        }

        // function blockGrid(){
        //     square.classList.add('unclickable');
        // }

        return square; 
    }
    createSquare(num);

    function gameOver(){
        const messageDiv = document.querySelector('.message');
        const scoreMessage = document.createElement('div');
        messageDiv.append(scoreMessage);
        scoreMessage.innerHTML = "Il tuo punteggio è: " + score + ".";
        // const scoreMessage = document.querySelector('.modal-bg');
        // scoreMessage.className = 'show-modal';
       

        if(score === maxAttempts){
            scoreMessage.innerHTML += " Hai vinto!"
            // console.log('hai vinto!');
        }
        else{
            scoreMessage.innerHTML += " Purtroppo hai perso"
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