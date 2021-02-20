var firstClick = null;
var secondClick = null;
var correctPars = [];
var waitingTime = 0;

function reroll() {

    firstClick = null;
    secondClick = null;
    correctPars = [];
    waitingTime = 0;

    document.getElementById('hits').value = 0;
    document.getElementById('errors').value = 0;


    var randomNumbers = [];
    while(randomNumbers.length < 24){
        var random = Math.floor(Math.random() * 24 + 1);
        if(randomNumbers.indexOf(random) == -1){
            randomNumbers.push(random);
        }
    }

    var table = '<table border="1"><tr>'
    var columnBreak = 1

    for(var i=0; i < randomNumbers.length; i++){
        if((columnBreak % 6) !== 0) table += `
        <td>
            <div class="card">
                <div id="front${randomNumbers[i]}" class="face front" onclick=turnCardUp(${randomNumbers[i]})>
                    <img width=150px src="imagens/frente.jpg">
                </div>
                <div id="back${randomNumbers[i]}" class="face back" onclick=turnCardUp(${randomNumbers[i]})>
                    <img id="img${randomNumbers[i]}" width=150px src="imagens/${randomNumbers[i]}.jpg">
                </div>
            </div>
        </td>`

        else table += `
        <td>
            <div class="card">
                <div id="front${randomNumbers[i]}" class="face front" onclick=turnCardUp(${randomNumbers[i]})>
                    <img width=150px src="imagens/frente.jpg">
                </div>
                <div id="back${randomNumbers[i]}" class="face back" onclick=turnCardUp(${randomNumbers[i]})>
                    <img id="img${randomNumbers[i]}" width=150px src="imagens/${randomNumbers[i]}.jpg">
                </div>
            </div>
        </td></tr><tr>`
        
        columnBreak ++
    }

    table += '</tr></table>'
    document.getElementById('container').innerHTML= table;
}

function checkPairs() {

        if (!(firstClick % 2) && ((firstClick - 1) === secondClick) || 
        (firstClick % 2) && ((firstClick + 1) === secondClick)) {
            
            alert('Parabéns!');

            const hitsElement = document.getElementById('hits');
            var value = hitsElement.value;
            
            value++;
            hitsElement.value = value;

            correctPars.push(firstClick, secondClick);
            
            firstClick = null;
            secondClick = null;

            waitingTime = 0;
        } else {

            alert('Tente novamente!');

            const errorsElement = document.getElementById('errors');
            var value = errorsElement.value;
            
            value++;
            errorsElement.value = value;

            turnCardDown();

            firstClick = null;
            secondClick = null;
        }
}

function turnCardUp(id) {

    if(!correctPars.includes(id) && id != firstClick && waitingTime === 0){

        waitingTime = 1;

        const front = document.getElementById(`front${id}`);
        const back = document.getElementById(`back${id}`);
        
        front.style.transform = "perspective(500px) rotateY(180deg)";
        back.style.transform = "perspective(500px) rotateY(360deg)";

        if (!firstClick) {
            
            firstClick = id;

            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(waitingTime = 0);
                }, 900);
            });
            
        } else {

            secondClick = id;

            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(checkPairs());
                }, 900);
            });
        }
    }
}

function turnCardDown() {

    const front = document.getElementById(`front${firstClick}`);
    const back = document.getElementById(`back${firstClick}`);
    const front2 = document.getElementById(`front${secondClick}`);
    const back2 = document.getElementById(`back${secondClick}`);
    
    front.style.transform = "perspective(500px) rotateY(0deg)";
    back.style.transform = "perspective(500px) rotateY(180deg)";
    front2.style.transform = "perspective(500px) rotateY(0deg)";
    back2.style.transform = "perspective(500px) rotateY(180deg)";

    return new Promise(resolve => {
        setTimeout(() => {
          resolve(waitingTime = 0);
        }, 900);
    });
}

reroll();
