//game logic 
export function checkWin(grid) {
    let isThereAnyEmptyCells = false;
    for (let i = 0; i < grid.length; i++) {


        if (i === 0 || i === 3 || i === 6) {
            if (grid[i].getAttribute("data-state") !== "empty"
                && grid[i].getAttribute("data-state") ===
                grid[i + 1].getAttribute("data-state") &&
                grid[i + 1].getAttribute("data-state") ===
                grid[i + 2].getAttribute("data-state")) {
                // which should return either X or 0
                return grid[i].getAttribute("data-state");

            }
        }
        if (i < 3) {
            if (grid[i].getAttribute("data-state") !== "empty"
                && grid[i].getAttribute("data-state") ===
                grid[i + 3].getAttribute("data-state") &&
                grid[i + 3].getAttribute("data-state") ===
                grid[i + 6].getAttribute("data-state")) {
                // which should return either X or 0
                return grid[i].getAttribute("data-state");

            }
        }
        if (grid[0].getAttribute("data-state") !== "empty"
            && grid[0].getAttribute("data-state") ===
            grid[4].getAttribute("data-state") &&
            grid[4].getAttribute("data-state") ===
            grid[8].getAttribute("data-state")) {
            // which should return either X or 0
            return grid[0].getAttribute("data-state");

        }
        if (grid[2].getAttribute("data-state") !== "empty"
            && grid[2].getAttribute("data-state") ===
            grid[4].getAttribute("data-state") &&
            grid[4].getAttribute("data-state") ===
            grid[6].getAttribute("data-state")) {
            // which should return either X or 0
            return grid[2].getAttribute("data-state");

        }
        if (grid[i].getAttribute("data-state") === "empty") {
            isThereAnyEmptyCells = true;
        }

    }
    if (isThereAnyEmptyCells === true) {
        return null;
    } else {
        console.log("T");
        return "T";
    }


}
