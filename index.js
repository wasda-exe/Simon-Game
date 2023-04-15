let level = 0;
let maxLevel = 0;
let counter = -1;
const buttonColors = ['green','red','yellow','blue'];
let colorSequence = [];
let userClickedSequence = [];

// START GAME
// start game via keypress
$(document).keypress(event => {
    if(level === 0)
    {
        nextSequence()
    }
});
// start game via button
$(".start-button").click(event => {
    if(level === 0)
    {
        nextSequence();
    }
})

// PC GENERATES NEXT COLOR SEQUENCE
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
}

// EVENT LISTENERS TO EACH BUTTON
$(".btn").click(event => {
    if(level === 0)
        return;
    // called at each button press
    updateSequence(event);
    checkCurrentClicked(event);
});

// update user clicked sequence
function updateSequence(event) {
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
}

// checks if button press is valid
function checkCurrentClicked(event) {
    // indicate checking current button
    counter++;
    // still checking current sequence
    if(counter < colorSequence.length)
    {
        // user gets sequence so far correct
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
        // user makes a mistake in sequence
        else
        {
            userClickedSequence.length = 0;
            counter = -1;
            gameOver();
        }
    }
}

function showCorrectSequence() {
    $("#correct-sequence").animate({opacity:1}, 100);

    // timer between each press
    colorSequence.forEach((ele, index) => {
        setTimeout(() => {
            playSound(ele);
            animatePress(ele);
        }, 500 * (index + 1));
    });

    // delay before correct sequence statement is removed
    setTimeout(() => {
    $("#correct-sequence").animate({opacity:0}, 100);
    }, 2000);
}
function gameOver() {
    $("#level-title").text('Game Over. Press any key to restart.');
    
    // show user what the correct sequence was
    // timer before sequence shown
    setTimeout(() => {
        showCorrectSequence();

        // reset pc color sequence
        colorSequence.length = 0;
    }, 600);

    // update max score
    // reset level
    if(level > maxLevel)
    {
        maxLevel = level;
        $(".score").text(maxLevel);
    }
    level = 0;

    // background flash to indicate game over
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