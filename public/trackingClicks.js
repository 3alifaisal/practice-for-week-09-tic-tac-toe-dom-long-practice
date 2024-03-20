import { checkWin } from "./checkWin.js";


export function trackingClicks() {
    const gridCells = document.querySelectorAll("main #gridBody div");
    const counterInStorage = sessionStorage.getItem("counter");
    let clickCount;
    if(counterInStorage) {
        const storedCounter = JSON.parse(counterInStorage);
        clickCount = storedCounter
    } else{
        clickCount = 0;
    }
    const winnerInStorage = sessionStorage.getItem("winner");
    let winner;
        if(winnerInStorage) {
            const storedWinner = JSON.parse(winnerInStorage);
            winner = storedWinner
        } else {
            winner =null;
        }
        if(winner) {
            handleWinner(winner, gridCellOnClick);
            return;
        }
    function gridCellOnClick(event) {
        const gridCell = event.currentTarget;
        clickCount++;
        storeCounter(clickCount)
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("hollow-circle");
        gridCell.append(circleDiv);
        circleDiv.addEventListener("animationend", animationEndHandler);
        const answerImage = document.createElement("img");
        if (clickCount % 2 !== 0) {
            //x player
            answerImage.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
            gridCell.setAttribute('data-state', "X");
        } else {
            //o player
            answerImage.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
            gridCell.setAttribute("data-state", "O");
        }
        gridCell.append(answerImage);

        
        event.stopPropagation();
        storeElement(gridCell);
        // Remove the click event listener after it's been clicked once
        gridCell.removeEventListener("click", gridCellOnClick);

        winner = checkWin(gridCells);
        if (winner) {
            storeGameResult(winner);
           handleWinner(winner,gridCellOnClick);
            
        }
    }

    for (let gridCell of gridCells) {
        if(gridCell.getAttribute("data-state") === "empty") {
        gridCell.addEventListener("click", gridCellOnClick);
        }  
    }
   
    const giveUpButton = document.querySelector("main #lower-buttons #give_up");
    
    giveUpButton.addEventListener("click", () => {
        if (!winner) {
        if(clickCount %2 !== 0) {
            winner = "O";
        } else{
            winner = "X";
        }
        handleWinner(winner,gridCellOnClick);
        }
    })
}

function animationEndHandler(event) {
    const circleDiv = event.target;
    circleDiv.remove();
}


function handleWinner(winner,eventListener) {
    const gridCells = document.querySelectorAll("main #gridBody div");
    for (let cell of gridCells) {
        cell.removeEventListener("click", eventListener);
    }
    const winnerAnnouncement = document.querySelector("main h2");
    winnerAnnouncement.innerText = `Winner: ${winner}`;
}
// there was a small issue here with the node being copied twice so i decided to do something
function storeElement(element) {
   
    if (element) {
        const cloneElement = element.cloneNode(true);
      const circleDiv =  cloneElement.querySelector(".hollow-circle");
      circleDiv.remove();
        const elementData = {
            id: cloneElement.id,
            className: cloneElement.className,
            innerHTML: cloneElement.innerHTML,
            // Add more properties as needed
            dataState: cloneElement.getAttribute('data-state') // Assuming the attribute is 'data-state'
        };

        sessionStorage.setItem(cloneElement.id, JSON.stringify(elementData));
    }
}


function storeCounter(counter) {
    sessionStorage.setItem("counter",JSON.stringify(counter));
}

function storeGameResult(winner) {
    sessionStorage.setItem('winner',JSON.stringify(winner))
}