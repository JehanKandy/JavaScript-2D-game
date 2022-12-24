function validateUser() {
    var un = document.forms["gameForm"]["username"].value
    if (un == "") {
        alert("Empty Input");
    } else {
        window.location.href = "game.html";
    }
}

var boy = document.getElementById("boy");

var deadSound = new Audio("../images/dead.mp3");
var runSound = new Audio("../images/run.mp3");
var jumpSound = new Audio("../images/jump.mp3");


var idleimgNum = 1;
var idle_w = 0;

function idleLevel() {

    idleimgNum = idleimgNum + 1;

    if (idleimgNum == 11) {
        idleimgNum = 1;
    }
    boy.src = "images/Idle (" + idleimgNum + ").png";
}

function IdelLevelStart() {
    idle_w = setInterval(idleLevel, 150);
}

var runimgNumber = 1;
var run_w = 0;


function RunLevel() {

    runimgNumber = runimgNumber + 1;
    if (runimgNumber == 11) {
        runimgNumber = 1;
    }


    boy.src = "images/Run (" + runimgNumber + ").png";
}

function runLevelStart() {
    run_w = setInterval(RunLevel, 150);
    clearInterval(idle_w);
    runSound.play();
}

var bk_position = 0;
var bk_w = 0;
var score = 0;

function BackgroundMove() {

    bk_position = bk_position - 20;
    document.getElementById("background").style.backgroundPositionX = bk_position + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score;

    var level = document.getElementById("level");


    if (score == 100) {
        level.innerHTML = "Level 01";
    }
    if (score == 200) {
        level.innerHTML = "Level 02";
    }
    if (score == 300) {
        level.innerHTML = "Level 03";
    }
    if (score == 400) {
        level.innerHTML = "Level 04";
    }
    if (score == 500) {
        level.innerHTML = "Level 05";
    }
    if (score == 600) {
        level.innerHTML = "Level 06";
    }
    if (score == 700) {
        level.innerHTML = "Level 07";
    }
    if (score == 800) {
        level.innerHTML = "Level 08";
    }
    if (score == 900) {
        level.innerHTML = "Level 09";
    }
    if (score == 1000) {
        level.innerHTML = "Level 10";
    }
    if (score == 1100) {
        level.innerHTML = "Level 11";
    }
    if (score == 1200) {
        level.innerHTML = "Level 12";
    }
    if (score == 1300) {
        level.innerHTML = "Level 13";
    }
    if (score == 1400) {
        level.innerHTML = "Level 14";
    }
    if (score == 1500) {
        level.innerHTML = "Level 15";
    }
    if (score == 1600) {
        level.innerHTML = "Level 16";
    }
    if (score == 1700) {
        level.innerHTML = "Level 17";
    }
    if (score == 1800) {
        level.innerHTML = "Level 18";
    }

}
var jumpImg = 1;
var jump_w = 0;
var jumpBoyMarginTop = 583;

function jumpLevel() {


    if (jumpImg <= 5) {
        jumpBoyMarginTop = jumpBoyMarginTop - 40;
        boy.style.marginTop = jumpBoyMarginTop + "px";
    }
    if (jumpImg >= 6) {
        jumpBoyMarginTop = jumpBoyMarginTop + 40;
        boy.style.marginTop = jumpBoyMarginTop + "px";
    }

    jumpImg = jumpImg + 1;
    if (jumpImg == 11) {
        jumpImg = 1;
        clearInterval(jump_w);
        jump_w = 0;
        runimgNumber = 0;
        runLevelStart();
    }

    boy.src = "images/Jump (" + jumpImg + ").png"
}

function jumpLevelStart() {
    clearInterval(idle_w);
    runimgNumber = 0;
    clearInterval(run_w);
    runSound.pause();
    jump_w = setInterval(jumpLevel, 150);
    jumpSound.play();

}

var boxMarginleft = 1000;

function createBoxes() {

    for (var i = 1; i <= 1000; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginleft + "px";
        box.id = "box" + i;

        if (i < 5) {
            boxMarginleft = boxMarginleft + 2000;
        }
        if (i >= 5) {
            boxMarginleft = boxMarginleft + 1000;
        }
    }
}

var barrier_w = 0;

function boxStart() {
    for (var i = 1; i < 1000; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -80 & newMarginLeft <= 80) {
            if (jumpBoyMarginTop > 582) {
                clearInterval(barrier_w);

                clearInterval(run_w);
                run_w = -1;

                clearInterval(jump_w);
                jump_w = -1;

                clearInterval(bk_w);
                bk_w = -1;

                dead_w = setInterval(BoyDead, 100);
                deadSound.play();
                runSound.pause();
                jumpSound.pause();

            }
        }
    }
}

var deadImg = 1;
var dead_w = 0;

function BoyDead() {

    deadImg = deadImg + 1;

    if (deadImg == 11) {
        deadImg = 10;

        document.getElementById("over").style.visibility = "visible";
        document.getElementById("scoreEnd").innerHTML = score;


    }

    boy.src = "images/Dead (" + deadImg + ").png";
}

function play_again() {
    location.reload();
}


function key(event) {
    if (event.which == 13) {
        if (run_w == 0) {
            runLevelStart();
        }
        if (bk_w == 0) {
            bk_w = setInterval(BackgroundMove, 150);
        }
        if (barrier_w == 0) {
            barrier_w = setInterval(boxStart, 150);
        }
    }
    if (event.which == 32) {
        if (jump_w == 0) {
            jumpLevelStart();
        }
        if (bk_w == 0) {
            bk_w = setInterval(BackgroundMove, 150);
        }
        if (barrier_w == 0) {
            barrier_w = setInterval(boxStart, 150);
        }
    }

}