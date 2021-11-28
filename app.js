const box = document.querySelector(".box");
const terrain = document.querySelector(".terrain");
const finish = document.querySelector(".finish");
const status = document.querySelector(".status");

let isStarted = false;
let eliminated = false;
let choice = false;
let change;
let checkActionInterval;

function startGame(el){
    isStarted = true;
    change = setInterval(changeLight, getRandomInt(1000, 6000));
    status.innerText = "Game started";
    console.log("game started");
}

document.addEventListener("DOMContentLoaded", function(){
    setBoxColor(choice);
    terrain.style.width = getCookie("diff");
});

terrain.addEventListener("mouseout", function(){
    if(isStarted && !eliminated && !choice){
        checkAction();
    }
});

terrain.addEventListener("mousemove", function(){
    if(isStarted && !eliminated && !choice){
        checkActionInterval = setInterval(checkAction, 200);
    }
})

finish.addEventListener("mouseover", function(){
    if(!eliminated && isStarted){
        console.log("Survived");
        status.innerText = "You've passed this game!";
        clearInterval(change);
    }
   
});

function checkAction(){
    if(!choice){
        clearInterval(checkActionInterval);
        eliminate();
    }
}

function eliminate(){
    eliminated = true;
    box.style.background = "blue";
    status.innerText = "You've been eliminated";
    terrain.classList.add("end");
    console.log("lost");
}

function changeLight(){
    if(!eliminated){
        choice = !choice ? true : false;
        setBoxColor(choice);
    }else{
        eliminate();
    }
}

function setBoxColor(choice){
    if(choice){
        box.style.background = "green";
    }else{
        box.style.background = "red";
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function changeDifficulty(el){
    let diff = el.getAttribute("data-diff");
    console.log(diff);

    if(diff === "very-easy"){
        terrain.style.width = "400px";
        setCookie("diff", "400px", 20);
    }else if(diff === "easy"){
        terrain.style.width = "600px";
        setCookie("diff", "600px", 20);
    }else if(diff === "normal"){
        terrain.style.width = "800px";
        setCookie("diff", "800px", 20);
    }else if(diff === "hard"){
        terrain.style.width = "1200px";
        setCookie("diff", "1200px", 20);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}