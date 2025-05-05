let level = 0;
let gameStarted = false;
let initialBoxColors = ["red", "yellow", "mediumblue", "aqua"];
let i = 0;

let userClick = [];
let flashedColors = [];
let start = document.querySelector(".start");

start.addEventListener("click", function (event) {

    if (!gameStarted && !event.target.classList.contains("box")) {
        gameStarted = true;
        start.innerText = "Started the game";
        start.style.backgroundColor = "black";

        console.log("game started");
        let h2 = document.querySelector("h2");
        level = 1;


        h2.innerText = `Level ${level}`;
        flash();

    }

});
function flash() {
    let randomIndex = Math.floor(Math.random() * 4);
    console.log(randomIndex);
    let color = initialBoxColors[randomIndex]

    console.log(color);
    let toflash = document.querySelector(`.${color}`);
    toflash.classList.add("white");
    setTimeout(function () {
        toflash.classList.remove("white");
    }, 200);
    flashedColors.push(`${color}`);
    console.log("flashed", flashedColors);

}



function boxPress(event) {
    event.stopPropagation();
    console.log("The button is pressed");
    if (gameStarted == true) {
        let clickedColor = this.classList[0];
        userClick.push(clickedColor);
        console.log("clicked", userClick);
    }

    let currentindex = userClick.length - 1;
    if (userClick[currentindex] === flashedColors[currentindex] && gameStarted == true) {
        if (userClick.length == flashedColors.length) {
            console.log("user clicked right");
            // user got the full sequence right 
            setTimeout(function () {
                level++;
                let h2 = document.querySelector("h2");
                h2.innerText = ` level ${level}`;
                userClick = [];
                flash();
            }, 500);
        }
    } else if (gameStarted == false) {

    }
    else {
        let h2 = document.querySelector("h2");
        h2.innerText = `The game is over as you clicked a wrong Color your score is ${level}`;
        userClick = [];
        flashedColors = [];
        level = 0;
        gameStarted = false;
        start.innerText = "Start the Game";
    }

}

let boxes = document.querySelectorAll(".box");
for (box of boxes) {
    box.addEventListener("click", boxPress)
}


