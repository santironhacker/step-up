var taulell;
var contador = 3;
var monedesJugadorA = 30;
var monedesJugadorB = 30;
var answerForA;
var answerForB;
var gameFinished = false;

            
function askForA() {
    answerForA = prompt('Quantes monedes aposta el jugador A?', 'Et queden ' + monedesJugadorA + ' monedes'); 
    if(
        Number.isInteger(Number(answerForA)) 
        && (monedesJugadorA - Number(answerForA) >= 0)
        && Number(answerForA) > 0
    ) {
        return;
    }
    else if (
        answerForA === null
    ) {
        volsAcabarElJoc();
    }
    else {
        alert('Tiu, escriu un numero vàlid!');
        this.askForA();
    }
}

function askForB() {
    answerForB = prompt('Quantes monedes aposta el jugador B?', 'Et queden ' + monedesJugadorB + ' monedes');
    if(
        Number.isInteger(Number(answerForB))
        && (monedesJugadorB - Number(answerForB)>= 0)
        && Number(answerForB) > 0
    ) {
        return;
    }
    else if (
        answerForB === null
    ) {
        volsAcabarElJoc();
    }
    else {
        alert('Tiu, escriu un numero vàlid!');
        this.askForB();
    }
}

function gameStatus() {
    taulell = [0, 0, 0, 0, 0, 0, 0];
    taulell.splice(contador, 1, 1);
    console.log('El taulell es: ', taulell);
    console.log('Jugador A li queden ', monedesJugadorA + ' monedes.');
    console.log('Jugador B li queden ', monedesJugadorB + ' monedes.');
}


document.addEventListener("keydown", event => {
    if(event.code === "Space") {
        gameStatus();
        launchGame();
    }
});

var playerAWins = function() {
    if(monedesJugadorB == 0) {
        let testigo = contador;
        for(var i = 0; i < monedesJugadorA; i++) {
            testigo--;
        }
        if(testigo < 3) {
            return true;
        } 
        else if (testigo == 3) {
            endGame('Això és un empat senyores i senyors!!');
        }
        else {
            return false;
        }
    }
}

function launchGame() {
    while (!gameFinished) {
        askForA();
        askForB();
        monedesJugadorA -= Number(answerForA);
        monedesJugadorB -= Number(answerForB);
        if(answerForA > answerForB) {
            contador -= 1;
        }
        if(answerForB > answerForA) {
            contador += 1;
        }
        gameStatus();
        if(
            contador == 0
            || playerAWins()
        ) {
            endGame('El jugador A és el guanyador!');
        } 
        if (
            contador == 6
            || !playerAWins()
        ) {
            endGame('El jugador B és el guanyador!');
        }
    }
}

function volsAcabarElJoc() {
    if(confirm("Vols abandonar el joc?")) {
        endGame("El joc ha acabat en empat.");
    } else {
        launchGame();
    } 
}


function endGame (message) {
    gameFinished = true;
    alert(message);
}

console.log('Per començar, premeu la barra d\'espai');


