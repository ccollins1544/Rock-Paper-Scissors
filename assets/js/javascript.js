/**
 * Rock Paper Scissors Game JS
 * 
 * 1.0 Collect all variables
 *   1.1 DOM ELEMENTS
 *   1.2 RESET GAME VARIABLES
 *   1.3 Button Pressed Event
 * 
 * 2.0 See Who Won
 *   2.1 Reset Styling
 *   2.2 Condition Variables
 *   2.3 PLAYER MOVE
 *   2.4 PC MOVE
 * 
 * 3.0 Determine The Winner
 *   3.1 CHECK FOR TIE GAME
 *   3.2 NOT A TIE GAME
 *   3.3 Set Results
 * 
 * 4.0 Display Results
 *   4.1 Change Styling
 *   4.2 Change HTML
 *******************************************************************/
/**
 * 1.0 Collect all variables
 */
// 1.1 DOM ELEMENTS
YOUR_MOVE = document.getElementById("your_move");
YOUR_MOVE_IMAGE = document.getElementById("your_move_img");

GAME_MOVE = document.getElementById("pc_move");
GAME_MOVE_IMAGE = document.getElementById("pc_move_img");

GAME_RESULTS = document.getElementById("game_results");
SCORE_LOSSES = document.getElementById("score_losses");
SCORE_WINS = document.getElementById("score_wins");
ROUNDS_PLAYED = document.getElementById("rounds_played");
WINS_LOSSES = document.getElementById("wins_vs_losses");

// 1.2 RESET GAME VARIABLES
var player_move = "";
var wins = 0;
var loses = 0;
var change_style = "list-group-item-light"; //"black";
GAME_RESULTS.classList.add(change_style);
GAME_RESULTS.classList.remove("list-group-item-danger");
GAME_RESULTS.classList.remove("list-group-item-success");

// 1.3 Button Pressed Event
document.onkeyup = function (event) {
  var key_pressed = event.key;
  see_who_won(key_pressed);

  if(document.getElementById("rounds_played_item").offsetParent === null){
    document.getElementById("rounds_played_item").style.display = "block";
  }
}

/**
 * 2.0 See Who Won
 *
 * This is the core function of the game. It just needs to know
 * what letter was pressed out of r, p, or s. 
 * Then results will be displayed on the page based on the random
 * choice the PC picks. 
 * 
 * @param string letter_pressed
 * @return nothing
 */
function see_who_won(letter_pressed) {
  // 2.1 Reset Styling
  GAME_RESULTS.classList.remove("list-group-item-light");
  GAME_RESULTS.classList.remove("list-group-item-danger");
  GAME_RESULTS.classList.remove("list-group-item-success");
  GAME_RESULTS.classList.remove("list-group-item-warning");

  /** 
   * 2.2 Condition Variables
   */
  var optionsObj = {
    "r": {
      "word": "rock",
      "image": "assets/images/rock.jpg",
    },

    "p": {
      "word": "paper",
      "image": "assets/images/paper.jpg",
    },

    "s": {
      "word": "scissors",
      "image": "assets/images/scissors.jpg",
    },

    getIndex: function (i) {
      var o = ["r", "p", "s"];
      return this[o[i]];
    }
  };

  // 2.3 PLAYER MOVE
  player_move = optionsObj[letter_pressed];

  if (player_move === undefined) {
    document.body.style.backgroundColor = "#ffeeba";
    GAME_RESULTS.classList.add("list-group-item-warning");
    GAME_RESULTS.innerHTML = "CANT DO THAT";
    return; // NOTE: This return here will exit the function making so the code below does not run. 
  }

  // 2.4 PC MOVE
  var min = 0;
  var max = 3;
  var pc_index = Math.floor(Math.random() * Math.floor(+max - +min)) + +min;
  var pc_move = optionsObj.getIndex(pc_index);

  /**
   * 3.0 Determine The Winner
   */
  var RESULTS = "";

  // 3.1 CHECK FOR TIE GAME
  if (player_move.word == pc_move.word) {
    RESULTS = "TIE GAME!";
    change_style = "list-group-item-light";
    change_page_style = "#fff";

  } else {
    // 3.2 NOT A TIE GAME
    /*****************************
     * Lose Conditions
     * 
     * Player    vs  PC
     * ---------------------------
     * ROCK      vs  PAPER
     * SCISSORS  vs  ROCK
     * PAPER     vs  SCISSORS
     ****************************/
    did_you_win = false; // Let's just assume you lost first...then we'll check the win conditions next.

    /****************************
     * Win Conditions
     * 
     * Player    vs  PC
     * ---------------------------
     * ROCK      vs  SCISSORS
     * SCISSORS  vs  PAPER
     * PAPER     vs  ROCK
     ****************************/
    if (player_move.word === "rock" && pc_move.word === "scissors" ||
      player_move.word === "scissors" && pc_move.word === "paper" ||
      player_move.word === "paper" && pc_move.word === "rock") {
      did_you_win = true;
    }

    // 3.3 Set Results
    if (did_you_win) {
      RESULTS = "YOU WIN!";
      change_style = "list-group-item-success";
      change_page_style = "#c3e6cb";
      wins++;

    } else {
      RESULTS = "YOU LOSE!";
      change_style = "list-group-item-danger";
      change_page_style = "#f5c6cb";
      loses++;
    }

  } // END CHECK FOR TIE GAME

  /**
   * 4.0 Display Results
   */
  // 4.1 Change Styling
  GAME_RESULTS.classList.add(change_style);
  document.body.style.backgroundColor = change_page_style;
  WINS_LOSSES.style.color = (wins > loses) ? "#155724" : "#721c24";
  YOUR_MOVE_IMAGE.src = player_move.image;
  GAME_MOVE_IMAGE.src = pc_move.image;

  // 4.2 Change HTML
  YOUR_MOVE.innerHTML = player_move.word;
  GAME_MOVE.innerHTML = pc_move.word;

  GAME_RESULTS.innerHTML = RESULTS;
  SCORE_WINS.innerHTML = wins;
  SCORE_LOSSES.innerHTML = loses;
  ROUNDS_PLAYED.innerHTML = (wins + loses);
  // console.log((wins > loses) ? "WINS!" : ((wins === loses) ? "TIE" : "LOSSES!"));
  WINS_LOSSES.innerHTML = (wins > loses) ? "WINS!" : ((wins === loses) ? "TIE" : "LOSSES!");

  return; // We are not returning anything but typically good to exit a function with return.
} // END see_who_won()