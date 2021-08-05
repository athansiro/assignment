//Get the classes
const holes = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');
const time = document.getElementById('time');

//Define default values
let timer_on_the_role = 0;
let score = 0;
let timeUp = false;
let moles_to_show = [1, 2, 3, 4, 5];

//Function to check if the game is on process
function check_continue() {
    let counter = 60;
    //get last known time from local storage
    let check_last_known_time = localStorage.getItem("last_known_time");

    //get last score from local storage
    let check_last_score = localStorage.getItem("last_score");

    //conditions to continue the game based on last_known_time; if value is not 0;
    if (check_last_known_time != 0) {
        counter = check_last_known_time;
        duration = counter + '000';
        startGame(counter, check_last_score, duration);
    } else {}
}

//function to start a new game;
function start_new() {
    //Data stored at local storage are set to initial value:0;
    localStorage.setItem("last_score", 0);
    localStorage.setItem("last_known_time", 0);

    //Start game has three default parameters: Time counter:60, initial score:00, and game duration:60000 
    startGame(60, 00, 60000);
};

//Start new game function
function startGame(counter, score, duration) {
    //set timer a score value display;
    scoreBoard.textContent = score;
    time.textContent = counter;

    //timeup is set to false to role the game for 60 seconds;
    timeUp = false;

    //show random moles for 60 seconds 
    setTimeout(() => timeUp = true, duration);

    //assign counter value to set the initial count down value 
    timer(counter);

    //disabled the start button
    document.getElementById("startBtn").disabled = true;
};

//function to catch the mole
function catch_the_mole(e) {
    //Get last_score from local storage
    let check_last_score = localStorage.getItem("last_score");
    let finalScore;

    //Process to check if the score count should continue from previous score or not.
    if (check_last_score != 0) {
        //if last_score from local storage is not 0 assign it to the final score
        finalScore = check_last_score;
    } else {
        //else set the final score to intial score 
        finalScore = score;
    }

    //increment the score.
    finalScore++;

    //remove the mole show class to display its initial icon: X 
    this.classList.remove('mole_show');

    //Display the final score
    scoreBoard.textContent = finalScore;

    //Set the final score to local storage
    localStorage.setItem("last_score", scoreBoard.textContent);
}

//generate random time between 1-3 seconds
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Save last known time.
function save_last_known_time(time) {
    localStorage.setItem("last_known_time", time);
}

//Main function to extract random moles.
function set_random_moles() {

    //Get random moles between 1-5 count
    var set_moles_to_show = moles_to_show[Math.floor(Math.random() * moles_to_show.length)];

    let get_index = [];

    //Get all available moles
    for (var i = 0; i < holes.length; i++) {
        holes[i].classList.remove('mole_show');
        get_index.push(i);
    }

    //Get 1-5 random moles
    random_moles = get_index.slice(0, set_moles_to_show).map(function() {
        return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, get_index.slice());


    //Assign random time betweeb 1-3 seconds
    const time = randomTime(1000, 3000);

    //Show the moles
    for (var i = 0; i < random_moles.length; i++) {
        holes[random_moles[i]].classList.add('mole_show');
    };

    //Assign click event to moles to count the score
    const moles = document.querySelectorAll('.mole_show');
    moles.forEach(el => el.addEventListener('click', catch_the_mole))

    //Method to continue the game by checking the time: countdown
    setTimeout(() => {
        if (!timeUp) {
            set_random_moles();
        }
    }, time);
};

//Timer function
function timer(counter) {
    //Set the counter and begin the game
    var count = counter,
        timer = setInterval(function() {
            //assign the time count
            time.textContent = (count--);
            //save_last_known_time for future reference when page is loaded
            save_last_known_time(time.textContent);
            if (count == 1) {
                clearInterval(timer);
                time.textContent = 00;
                time.textContent = 00;
                //Set save_last_known_time 0 once the game is over
                save_last_known_time(0);
                //Reenable the start game button
                document.getElementById("startBtn").disabled = false;
            };
        }, 1000);

    set_random_moles();
}

//on page load call this function to check if there is a game on process;
check_continue();