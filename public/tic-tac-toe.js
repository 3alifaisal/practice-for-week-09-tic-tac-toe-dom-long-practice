// Your code here
import {trackingClicks } from "./trackingClicks.js"

document.addEventListener("DOMContentLoaded", () => {
    loadGameBody();
    if(sessionStorage.length !== 0) {
        retrieveGrids();
    }
    trackingClicks();
    handleRestartGame();

})


function loadGameBody () {
    const gridBody = document.querySelector("#gridBody")
    for(let i =0;  i< 9; i++){
        const gridCell = document.createElement("div");
        // handling borders 
        if(i < 6){
            gridCell.classList.add("border-bottom");
        }
        if(i ===1 || i === 4 || i === 7){
            gridCell.classList.add("border-right");
            gridCell.classList.add("border-left");
        }
        // handling coordinates 

        //for simplicity without y 
        gridCell.setAttribute('data-state', "empty");
       

        gridCell.id = `square-${i}`
        gridBody.append(gridCell);
        
    }

}
function handleRestartGame() {
    const restartGameButton = document.querySelector("main #lower-buttons #new_game");
    const mainSectionH2Element = document.querySelector("main h2");
    
    restartGameButton.addEventListener("click", () => {
        if (mainSectionH2Element.innerText !== "") {
            const gameBody = document.querySelector("#gridBody");
            gameBody.remove();
            const newGameBody = document.createElement("div");
            newGameBody.id = "gridBody";
            const mainSection = document.querySelector("main");
            const mainSectionLowerButtons = document.querySelector("main #lower-buttons")
            mainSection.insertBefore(newGameBody,mainSectionLowerButtons);
            mainSectionH2Element.innerText="";
            sessionStorage.clear();
            loadGameBody();   
            trackingClicks();
          }
     })

   }
   
function retrieveGrids() {
    const gridCells = document.querySelectorAll("main #gridBody div"); 

    for(let grid of gridCells) {
        const gridInStorage = sessionStorage.getItem(grid.id);

        if (gridInStorage) {
            const storedGrid= JSON.parse(gridInStorage);
            grid.id = storedGrid.id;
            grid.className = storedGrid.className;
            grid.innerHTML = storedGrid.innerHTML;
            grid.setAttribute("data-state",storedGrid.dataState)
        }
    }
    
}