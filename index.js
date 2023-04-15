let level = 0;
let maxLevel = 0;
let counter = -1;
const buttonColors = ['green','red','yellow','blue'];
let colorSequence = [];
let userClickedSequence = [];

$(document).keypress(event => {
    if(level === 0)
    {
        nextSequence()
    }
});

function nextSequence() {
    updateLevel();
    // pc chooses color
    let randomNumber = randomNumberGenerator();
    let randomChosenColor = buttonColors[randomNumber];

    // add chosen color to pc sequence
    colorSequence.push(randomChosenColor);
    // ui response
    playSound(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);


    // verifySequence();
}

$(".btn").click(event => {verifySequence(event)});

// called at each button press
// checks if button press is valid
function verifySequence(event) {
    if(level === 0)
        return;
    // user chooses color
    let userClickedColor = event.target.id;

    // add chosen color to user sequence
    userClickedSequence.push(userClickedColor);
    // ui response
    playSound(userClickedColor);
    animatePress(userClickedColor);
    // // testing
    // console.log(userClickedSequence);
    // console.log(colorSequence);
    // // console.log(counter);
    // console.log(colorSequence.length);
    // console.log(userClickedSequence.length);

    // logic
    // indicate checking current button
    counter++;
    // still checking current sequence
    if(counter < colorSequence.length)
    {
        // console.log(counter);
        if(colorSequence[counter]===userClickedSequence[counter])
        {
            // success on final check of color sequence
            if(counter === colorSequence.length - 1)
            {
                // empty userClickedSequence
                userClickedSequence.length = 0;
                counter = -1;
                // start the nextSequence
                setTimeout(() => {
                    nextSequence();
                }, 750);
            }
        }
        else
        {
            userClickedSequence.length = 0;
            counter = -1;
            gameOver();
        }
    }
}

function gameOver() {
    $("#level-title").text('Game Over. Press any key to restart.');
    colorSequence.length = 0;

    // update max score
    // reset level
    if(level > maxLevel)
    {
        maxLevel = level;
        $(".score").text(maxLevel);
    }
    level = 0;

    // background flash
    $("body").css('background-color', 'red')
    setTimeout(() => {
        $("body").css('background-color', '#3E4A3D');
    }, 300);
}

function randomNumberGenerator() {
    return Math.floor(Math.random() * 4);
}
function playSound(name) {
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(name) {
    $('#'+name).addClass('pressed');
    setTimeout(() => {
        $('#'+name).removeClass('pressed')}, 100);
}
function updateLevel() {
    level++;
    $('#level-title').text('Level '+level);
}

function pattern() {
    arr.push(randNum);
    $(val.randNum).click();
}


// $("#red").click(event => {
//     let audio = new Audio("sounds/red.mp3");
//     audio.play();
// })