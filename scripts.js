let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let dealerTextArea = document.getElementById('dealer-text-area');
let playerTextArea = document.getElementById('player-text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton= document.getElementById('hit-button');
let stayButton= document.getElementById('stay-button');
let addButton = document.getElementById('amount-plus');
let minButton = document.getElementById('amount-min');
let anteButton = document.getElementById('ante-button');
let playerMoneyBox = document.getElementById('player-money');
let quitButton = document.getElementById('quit-button');
let doubleDownButton = document.getElementById('double-down-button');

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    isStaying = false,
    isTied = false,
    hasDoubleDowned = false;
    dealerCards = [],
    downCard = '',
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [],
    playerMoney = 200,
    ante = 25;
    playerImages = [];


hitButton.style.display = "none";
stayButton.style.display = "none";
addButton.style.display = "none";
minButton.style.display = "none";
doubleDownButton.style.display = "none";
document.getElementById("item1").style.display = "none";
document.getElementById("item9").style.display  = "none";
document.getElementById("item11").style.display = "none";
showStatus();

newGameButton.addEventListener('click', function() {
    gameStarted = true;
    playerTextArea.innerText = 'Place a bet to begin!';
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    addButton.style.display = "inline";
    minButton.style.display = "inline";
    anteButton.style.display = "inline"
    doubleDownButton.style.display = "inline";
    anteButton.disabled = false;
    hitButton.disabled = true;
    stayButton.disabled = true;
    doubleDownButton.disabled = true;
    document.getElementById("anteBox").value = ante;
    document.getElementById("item1").style.display  = "inline";
    document.getElementById("item9").style.display = "inline";
    document.getElementById("item11").style.display = "inline";
    playerMoneyBox.value = "$" + playerMoney;
});

quitButton.addEventListener('click', function() {
    location.reload();
});

anteButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    playerMoney -= ante;
    addButton.disabled = true;
    minButton.disabled = true;
    anteButton.disabled = true;
    hitButton.disabled = false;
    stayButton.disabled = false;
    doubleDownButton.disabled = false;

    deck = createDeck();
    addImages(deck);
    shuffleDeck(deck);
    startDeal();
    downCard = dealerCards[1].image;

    playerTextArea.innerText = 'Started...';
    dealerTextArea.innerText = 'Started...';
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    addButton.style.display = "inline";
    minButton.style.display = "inline";
    document.getElementById("anteBox").value = ante;
    showStatus();
    checkForEndGame();
});

hitButton.addEventListener('click', function() {
    doubleDownButton.disabled = true;
    playerCards.push(getNextCard());
    checkForEndGame();
    showStatus();
});

stayButton.addEventListener('click', function() {
    gameOver = true;
    isStaying = true;
    checkForEndGame();
    showStatus();
});

doubleDownButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    hasDoubleDowned = true;
    gameOver = true;
    isStaying = true;
    playerMoney -= ante;
    ante *= 2;
    checkForEndGame();
    showStatus();
});
addButton.addEventListener('click', function() {
    if(playerMoney > ante){
        ante += 25;
    }
    document.getElementById("anteBox").value = ante;
});

minButton.addEventListener('click', function() {
    if(ante > 0){
        ante -= 25;
    }
    document.getElementById("anteBox").value = ante;
});

function checkForEndGame(){
    updateScores();
    while(dealerScore <= playerScore 
            && isStaying
            && playerScore != 21
            && dealerScore <= 17) {
        dealerCards.push(getNextCard());
        updateScores();
    }

    if(playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if(playerCards.length === 2 && playerScore === 21){
        playerWon = true;
        gameOver = true;
    }
    else if(dealerScore > 21){
        playerWon = true;
        gameOver = true;
    }
    else if(playerScore === dealerScore && isStaying){
        isTied = true;
        gameOver = true;
    }
    else if(gameOver && isStaying){
        if(playerScore > dealerScore){
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
};

function createDeck() {
    for(let suitIdx = 0; suitIdx<suits.length; suitIdx++){
        for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
            let card= {
                suit: suits[suitIdx],
                value: values[valueIdx],
                image:''
            };
            deck.push(card);
        }
    }

    return deck;
}

function addImages(deck) {
    deck[0].image = "img/cards/ace_hearts.svg";
    deck[1].image = "img/cards/king_hearts.svg";
    deck[2].image = "img/cards/queen_hearts.svg";
    deck[3].image = "img/cards/jack_hearts.svg";
    deck[4].image = "img/cards/10_hearts.svg";
    deck[5].image = "img/cards/9_hearts.svg";
    deck[6].image = "img/cards/8_hearts.svg";
    deck[7].image = "img/cards/7_hearts.svg";
    deck[8].image = "img/cards/6_hearts.svg";
    deck[9].image = "img/cards/5_hearts.svg";
    deck[10].image = "img/cards/4_hearts.svg";
    deck[11].image = "img/cards/3_hearts.svg";
    deck[12].image = "img/cards/2_hearts.svg";

    deck[13].image = "img/cards/ace_clubs.svg";
    deck[14].image = "img/cards/king_clubs.svg";
    deck[15].image = "img/cards/queen_clubs.svg";
    deck[16].image = "img/cards/jack_clubs.svg";
    deck[17].image = "img/cards/10_clubs.svg";
    deck[18].image = "img/cards/9_clubs.svg";
    deck[19].image = "img/cards/8_clubs.svg";
    deck[20].image = "img/cards/7_clubs.svg";
    deck[21].image = "img/cards/6_clubs.svg";
    deck[22].image = "img/cards/5_clubs.svg";
    deck[23].image = "img/cards/4_clubs.svg";
    deck[24].image = "img/cards/3_clubs.svg";
    deck[25].image = "img/cards/2_clubs.svg";

    deck[26].image = "img/cards/ace_diamonds.svg";
    deck[27].image = "img/cards/king_diamonds.svg";
    deck[28].image = "img/cards/queen_diamonds.svg";
    deck[29].image = "img/cards/jack_diamonds.svg";
    deck[30].image = "img/cards/10_diamonds.svg";
    deck[31].image = "img/cards/9_diamonds.svg";
    deck[32].image = "img/cards/8_diamonds.svg";
    deck[33].image = "img/cards/7_diamonds.svg";
    deck[34].image = "img/cards/6_diamonds.svg";
    deck[35].image = "img/cards/5_diamonds.svg";
    deck[36].image = "img/cards/4_diamonds.svg";
    deck[37].image = "img/cards/3_diamonds.svg";
    deck[38].image = "img/cards/2_diamonds.svg";

    deck[39].image = "img/cards/ace_spades.svg";
    deck[40].image = "img/cards/king_spades.svg";
    deck[41].image = "img/cards/queen_spades.svg";
    deck[42].image = "img/cards/jack_spades.svg";
    deck[43].image = "img/cards/10_spades.svg";
    deck[44].image = "img/cards/9_spades.svg";
    deck[45].image = "img/cards/8_spades.svg";
    deck[46].image = "img/cards/7_spades.svg";
    deck[47].image = "img/cards/6_spades.svg";
    deck[48].image = "img/cards/5_spades.svg";
    deck[49].image = "img/cards/4_spades.svg";
    deck[50].image = "img/cards/3_spades.svg";
    deck[51].image = "img/cards/2_spades.svg";
}

function shuffleDeck(deck) {
    for(let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function getNextCard() {
    return deck.shift();
}

function getCardString(card){
    return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card){
    switch(card.value){
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for(let i =0; i< cardArray.length; i++){
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if(card.value === "Ace"){
            hasAce = true;
        }
    }
    if(hasAce && score + 10 <= 21){
        return score + 10;
    }
    return score;
}

function startDeal(){
    playerCards.push(getNextCard());
    dealerCards.push(getNextCard());
    playerCards.push(getNextCard());
    dealerCards.push(getNextCard());
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    if(!gameStarted){
        dealerTextArea.innerText = '';
        playerTextArea.innerText = 'Welcome to Blackjack!';
        return;
    }
    playerMoneyBox.value = "$" + playerMoney;

    updateScores();

    let dealerCardString = '';
    for(let i=0; i < dealerCards.length; i++) {
        if(dealerCards.length === 2 && isStaying === false){
            dealerCards[1].image = "img/cards/card_back.svg";
        }
        else if(isStaying){
            dealerCards[1].image = downCard;
        }
        if(playerScore > 21){
            dealerCards[1].image = downCard;
        }
        dealerCardString += '<img src="' + dealerCards[i].image + '" class="card""></img>';

    }

    let playerCardString = '';
    for(let i=0; i < playerCards.length; i++) {
        playerCardString += '<img src="' + playerCards[i].image + '" class="card""></img>';
    }

    dealerTextArea.innerHTML = dealerCardString;
    playerTextArea.innerHTML = playerCardString;

    if(gameOver) {
        hitButton.disabled = true;
        stayButton.disabled = true;
        doubleDownButton.disabled = true;
        if(playerWon) {
            playerTextArea.innerHTML = "You Win! With a score of " + playerScore + "<br>" + playerCardString;
            dealerTextArea.innerHTML =  "Dealer score is " + dealerScore + "<br>" + dealerCardString;
            playerMoney = playerMoney + (ante*2);
            playerMoneyBox.value = playerMoney;
        }
        else if(isTied){
            playerTextArea.innerHTML = "It's a Draw! With a score of " + playerScore + "<br>" + playerCardString;
            dealerTextArea.innerHTML =  "It's a Draw! With a score of "  + dealerScore + "<br>" + dealerCardString;
            playerMoney = playerMoney + ante;
            playerMoneyBox.value = playerMoney;
            isTied = false;
        }
        else{
            dealerTextArea.innerHTML = "Dealer Wins! With a score of " + dealerScore + "<br>" + dealerCardString;
            playerTextArea.innerHTML = "You Lose! With a score of " + playerScore + "<br>" + playerCardString;
        }

        if(ante > playerMoney && playerMoney > 0){
            ante = 25;
            document.getElementById("anteBox").value = ante;
        }
        
        if(playerMoney < 25){
            ante = 0;
            document.getElementById("anteBox").value = ante;
            anteButton.disabled = true;
        }
        else{
            addButton.disabled = false;
            minButton.disabled = false;
            anteButton.disabled = false;
            hasDoubleDowned = false;
            dealerCards = [];
            playerCards = [];
            dealerScore = 0;
            playerScore = 0;
            deck = [];
            isStaying = false;
        }
    }
}

