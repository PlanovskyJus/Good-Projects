var sequence = []; // the ordered list of button presses
var buttons = [ // the button elements on the page
    document.getElementById("red"),
    document.getElementById("yellow"),
    document.getElementById("blue"),
    document.getElementById("green")
];

var audio = [
    new Audio ("audio/beep-02.mp3"),
    new Audio ("audio/beep-06.mp3"),
    new Audio ("audio/beep-09.mp3"),
    new Audio ("audio/beep-10.mp3")
    ];
var muted = false;
// putting these in arrays makes it so much easier trust me
var buttonColors = [
    'red',
    'yellow',
    'blue',
    '#00DB2C'
];
var darkButtonColors = [
    'darkred',
    '#BAB704',
    'darkblue',
    'darkgreen'
];
var currentButton = null; // the button that was most recently clicked
// var userButton;

// Clicking the start button calls this
function gameStart() {
    console.log("Game started");
    // Hide the start button now
    document.getElementById("startButton").style.visibility = "hidden";
    main();
}

// Set up event listeners for buttons 
for (let i = 0; i < buttons.length; i++) {
    // console.log(i);
    buttons[i].addEventListener("click", function () {
        currentButton = i;
        console.log('--- Button pressed!', currentButton);
    });
    buttons[i].addEventListener("click", function() {
        buttons[i].style.backgroundColor = buttonColors[i];
        if(!muted){
            audio[i].play();
        }
        setTimeout( function(){
          buttons[i].style.backgroundColor = darkButtonColors[i];  
        },200)
    });
}


// Main game loop function - Pick a random number, add to sequence, flash sequence
function main () {
    console.log('-------------- Main called ------------');
    // Get a random number and add it to the sequence
    var number = Math.floor(Math.random() * 4);
    sequence.push(number);
    console.log('Picked number:', number, 'Full sequence:', sequence);
    // Flash the sequence to the user
    flashButtons();
}
var roundNumber;
function flashButtons(sequenceIndex) {
    if (sequenceIndex == undefined) sequenceIndex = 0; // things
    let buttonNumber = sequence[sequenceIndex];
    var roundNumber = sequence.length;
        document.getElementById("roundNumber").innerHTML = roundNumber;
        document.getElementById("waitGo").innerHTML = "Wait....";
    // Set the button to the light version
    console.log('Flashing on:', sequenceIndex);
    buttons[buttonNumber].style.backgroundColor = buttonColors[buttonNumber];
    if(!muted)
    {
        audio[buttonNumber].play();
    }
    // And then turn it off again after a time
    setTimeout(function(){
        console.log('- and off.');
        buttons[buttonNumber].style.backgroundColor = darkButtonColors[buttonNumber];
        // Wait a bit more before moving on to the next one
        setTimeout(function(){
            // If this was the last button in the sequence, go to the next step
            if (sequenceIndex >= sequence.length - 1) {
                console.log('Done flashing everything now - that\'s the entire sequence.');
                document.getElementById("waitGo").innerHTML = "Go!";
                sequenceIndex = 0;
                getButton(sequenceIndex);
            }
            // Otherwise, flash the next button in the sequence
            else flashButtons((sequenceIndex) + 1);
        }, 200);
    }, 500);
}

function getButton (sequenceIndex) {
    if (sequenceIndex == undefined) sequenceIndex = 0;    
    //setTimeout(main, 3000);
    console.log('Now trying to get button', sequenceIndex);
        
    // Wait for the user to press a button
    if (sequenceIndex == sequence.length) {
        // The thing is done, do it again
        setTimeout(function(){
            main();
        }, 545);
    } else {
        // Move to the next button in the sequence
        currentButton = null;
        waitForButton(sequenceIndex);
    }
}
//wait between flashing colors or else bad happens
function waitForButton(sequenceIndex){
    console.log('Waiting...');
    if (currentButton == null) setTimeout(function(){waitForButton(sequenceIndex)}, 50);
    else return doneWaiting(sequenceIndex);
}

function doneWaiting(sequenceIndex) {
    console.log('Done waiting.');
    console.log(sequenceIndex);
    console.log('Was looking for', sequence[sequenceIndex], 'and got', currentButton);
    if(currentButton == sequence[sequenceIndex]){
        console.log("User clicked the right button!");
        //getButton(sequenceIndex + 1);
            getButton(sequenceIndex + 1);
    }else{
        console.log("User clicked the wrong button.");
        sequence = [];
        document.getElementById("waitGo").innerHTML = "GAME OVER";
        document.getElementById("startButton").style.visibility = "visible";
    }
}

if(muted == false){
    document.getElementById("muteImage").src = "images/mute.png";
}else if(muted == true){
    document.getElementById("muteImage").src = "images/muted.png";
}
var muteElement = document.getElementById("muteImage");
muteElement.onclick = function(){
    if(muted == false){
        muted = true;
        console.log("result 1");
        muteElement.src = "images/muted.png";
    }else if(muted == true){
        muted = false;
        console.log("result 2");
        muteElement.src = "images/mute.png";
    }
};



// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// function setCookie(cname,cvalue,exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
// //on page load look for cookie
// function checkCookie() {
//     var user=getCookie("highScore");//cookie high is this
//     if (user != "") {
//         document.getElementById("highScore").innerHTML = "High Score: " + user; //display high score
//     } else {
//         if(highScore > roundNumber){
//             user = highScore;
//       }
//       if (user != "" && user != null) {
//           setCookie("highScore", user, 30);
//       }
//     }
// }


// //test if the current score is higher than any cookie
// var storedCookieHigh;
// if(roundNumber > storedCookieHigh){
//     roundNumber = storedCookieHigh;
// }
// //on page load see what the cookie is and if you need to print it
// function checkCookie(){
//     var highScore = getCookie("highscore");
    
//     var value=getCookie("highScore");//cookie high is this
//     if (value != "") {
//         document.getElementById("highScore").innerHTML = "High Score: " + value; //display high score
//     } else {
//         if(highScore > roundNumber){
//             value = highScore;
//       }
//       if (value != "" && value != null) {
//           setCookie("highScore", value, 30);
//       }
//     }
// }
// //find the stored cookie
// function getCookie(cname){
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
// //create the cookie
// function setCookie(cname, cvalue, exdays){ //need to set this to body onpage load
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }