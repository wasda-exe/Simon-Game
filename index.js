
let level = 0;
let maxLevel = 0;
let lastIndex = -1;
const buttonColors = ['green','red','yellow','blue'];
let pcColorSequence = [];
let userColorSequence = [];

// start game via keypress or button click
$(document).keypress(event => {
    if(level === 0)
    {
        nextSequence()
    }
});
$(".start-button").click(event => {
    if(level === 0)
    {
        nextSequence();
    }
})


// pc generates next color sequence
function nextSequence() {
    updateLevel();
    // pc chooses color
    let randomNumber = randomNumberGenerator();
    let randomChosenColor = buttonColors[randomNumber];

    // add chosen color to pc sequence
    pcColorSequence.push(randomChosenColor);

    // ui response
    playSound(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
}


// check for click on each button
$(".btn").click(event => {
    if(level === 0)
        return;

    let userClickedColor = event.target.id;

    // ui response
    playSound(userClickedColor);
    animatePress(userClickedColor);

    updateUserSequence(userClickedColor);
    checkUserCurrentClick(userClickedColor);
});

// update user clicked sequence
function updateUserSequence(userClickedColor) {
    // add chosen color to user sequence
    userColorSequence.push(userClickedColor);

    // testing
    // console.log(userColorSequence);
    // console.log(pcColorSequence);
    // console.log(lastIndex);
    // console.log(pcColorSequence.length);
    // console.log(userColorSequence.length);
}

// checks if button press is valid
function checkUserCurrentClick(event) {
    // indicate checking current button
    lastIndex++;
    // still checking current sequence
    if(lastIndex < pcColorSequence.length)
    {
        // user gets sequence so far correct
        if(pcColorSequence[lastIndex]===userColorSequence[lastIndex])
        {
            // success on final check of color sequence
            if(lastIndex === pcColorSequence.length - 1)
            {
                // win condition
                if(level == 10)
                {
                    // alert('You win! Keep playing for a high score! You will now be shown the entire sequence once, so you can keep playing')
                    $(".prize-box").css("visibility", "visible");
                }

                // empty userColorSequence
                userColorSequence.length = 0;
                lastIndex = -1;
                // start the nextSequence
                setTimeout(() => {
                    nextSequence();
                }, 750);
            }
        }
        // user makes a mistake in sequence
        else
        {
            userColorSequence.length = 0;
            lastIndex = -1;
            gameOver();
        }
    }
}


function gameOver() {
    $("#level-title").text('Game Over. Press Any Key to Restart.');
    
    // show user what the correct sequence was
    setTimeout(() => {
        showCorrectSequence();

        // reset pc color sequence
        pcColorSequence.length = 0;
    }, 600);

    // update max score
    if(level > maxLevel)
    {
        maxLevel = level;
        $(".score").text(maxLevel);
    }

    // reset level
    level = 0;

    // ui response -> background flash to indicate game over
    $("body").css('background-color', 'red')
    setTimeout(() => {
        $("body").css('background-color', '#3E4A3D');
    }, 300);
}

function showCorrectSequence() {
    $("#correct-sequence").animate({opacity:1}, 100);

    // timer between each press
    pcColorSequence.forEach((ele, index) => {
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


function randomNumberGenerator() {
    return Math.floor(Math.random() * 4);
}
function playSound(color) {
    let audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(color) {
    $('#'+color).addClass('pressed');
    setTimeout(() => {
        $('#'+color).removeClass('pressed')}, 100);
}
function updateLevel() {
    level++;
    $('#level-title').text('Level '+level);
}