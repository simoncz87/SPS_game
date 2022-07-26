/*
How many hours did you spend on this assignment?: 5+ hours

What part of the assignment did you spend the most time on?: Assigning each function

How comfortable did you feel with this assignment? (1-5): 3

Is there anything in this code that you feel pleased about?: When it finally worked

What's one aspect of your code you would like specific, elaborate feedback on?: Too much assigning i guess, probably there is a shorter way to go about it
*/


// SPS - (winning conditions) scissors beats paper, paper beats rock, rock beats scissors
// to assign each variable

// allocate the names of scissors/paper/stone

var SCR = "scissors";
var PAP = "paper";
var STN = "stone";

// allocate the name of reverse scissors/paper/stone

var R_SCR = "reverse scissors";
var R_PAP = "reverse paper";
var R_STN = "reverse stone";

//  allocate the name of game mode

var Normal = "normal";
var R_SPS = "reverse sps";

// allocate player

var PLAYER = "player";
var COMPUTER = "computer";

// to track user name

var userName = "";

// to track game mode

var gmode = "";

// allocate a mode selection when user name is typed in

var modeSelect =
  " Please choose a game mode: 1. " + Normal + " 2. " + R_SPS + "";

// allocate the outcomes

var WIN = "win";
var LOSE = "lose";
var DRAW = "draw";

// to track player wins/computer wins/draw

var numPlayerWin = 0;
var numComputerWin = 0;
var numDraw = 0;

// to return item options for scissors/paper/stone similar to dice roll/secret word
// comRoll will be a random generated answer by the computer

var comRoll = function () {
  var randomItem = Math.floor(Math.random() * 3);

  if (randomItem == 0) {
    return SCR;
  }
  if (randomItem == 1) {
    return PAP;
  }
  return STN;

  // other alternative method
  // switch (randomItem) {
  //   case 1:
  //     return SCR;

  //   case 2:
  //     return PAP;

  //   case 3:
  //     return STN;

  //   default:
  //     break;
};

//  to return a function when player wins computer
//  to return a function with reverse scissors/paper/stone

var playerWin = function (player, computer) {
  if (gmode == R_SPS) {
    return (
      (player == R_SCR && computer == STN) ||
      (player == R_PAP && computer == SCR) ||
      (player == R_STN && computer == PAP)
    );
  }
  return (
    (player == SCR && computer == PAP) ||
    (player == PAP && computer == STN) ||
    (player == STN && computer == SCR)
  );
};

// to return a function when player draws with computer
// to return a function when player draws on reverse scissors/paper/stone

var playerDrawCom = function (player, computer) {
  if (gmode == R_SPS) {
    return (
      (player == R_SCR && computer == SCR) ||
      (player == R_PAP && computer == PAP) ||
      (player == R_STN && computer == STN)
    );
  }
  return (
    (player == SCR && computer == SCR) ||
    (player == PAP && computer == PAP) ||
    (player == STN && computer == STN)
  );
};

// assigning a picture to scissors/paper/rock
// assigning a picture as well for reverse scissors/paper/rock

var assignItem = function (object) {
  if (object == SCR || object == R_SCR) return " ✂️ ";
  if (object == PAP || object == R_PAP) return " 🗒 ";
  if (object == STN || object == R_STN) return " 🪨 ";
};

//  creating a message together with a picture (including assignItem function)

var itemMsg = function (player, computer) {
  var playerItem = assignItem(player);
  var computerItem = assignItem(computer);
  return (
    "Computer chose " +
    computer +
    computerItem +
    " You chose " +
    player +
    playerItem
  );
};

// create a input validation for the different game mode

var gameModeInput = function (userInput) {
  return userInput == Normal || userInput == R_SPS;
};

// instructions before playing

var playingInstructions = function () {
  var playInstruction =
    "Thank you for playing, " + userName + "! To begin, enter ";

  if (gmode == R_SPS) {
    return playInstruction + R_SCR + ", " + R_PAP + ", or " + R_STN + ".";
  }

  return playInstruction + SCR + ", " + PAP + ", or " + STN + ".";
};

//  win/lose/draw message (this will be attached to the end game message)

var winLoseDrawMsg = function () {
  return (
    userName +
    ": " +
    numPlayerWin +
    " | Computer: " +
    numComputerWin +
    " | Draws; " +
    numDraw
  );
};

// message after each round ends to select another option

var endGameMsg = function (outcome, before) {
  var instruction =
    " Type 'scissors', 'paper', 'stone' to play another round! ";
  if (gmode == R_SPS) {
    instruction =
      " Type 'reverse scissors', 'reverse paper', 'reverse stone' to play another round! ";
  }

  // create a message for each outcome (to add on the winLoseDrawMsg counter function in an outcome)

  if (outcome == WIN) {
    return before + userName + " wins! " + instruction + winLoseDrawMsg();
  }
  if (outcome == LOSE) {
    return before + userName + " lose! " + instruction + winLoseDrawMsg();
  }
  if (outcome == DRAW) {
    return before + userName + " draw! " + instruction + winLoseDrawMsg();
  }
};

// to write out main function
// key functions
// comRoll = computers choice
// playerWin = conditions when a player wins
// playerDrawCom = conditions when a draw is in place
// assignItem = assigning an object to the word
// itemMsg = message will also show an object
// gameModeinput = to validate the right game mode input
// playingInstructions = to be used after inputting user name and game mode
// endGameMsg = to be used as a win/lose/draw counter

var main = function (input) {
  if (!userName) {
    //  if there is no input to advise the player to input a name
    if (!input) {
      return "Kindly input your user name";
    }
    userName = input;

    return "Hi, " + userName + "" + modeSelect;
  }
  if (!gmode) {
    // if there is no input to advise the player to input a mode
    if (!input) {
      return modeSelect;
    }
    // create a var if the input is valid
    var inputValid = gameModeInput(input);
    // create a path if the mode input is invalid
    if (!inputValid) {
      return modeSelect;
    }
    gmode = input;

    var toPlayInstructions = playingInstructions();
    return toPlayInstructions;
  }

  // players input
  var player = input;
  // computers answer
  var computer = comRoll();
  // message of what both players objects are
  var firstObjMsg = itemMsg(player, computer);

  // if player and computer draws

  if (playerWin(player, computer)) {
    numPlayerWin += 1;
    return endGameMsg(WIN, firstObjMsg);
  }
  if (playerDrawCom(player, computer)) {
    numDraw += 1;
    return endGameMsg(DRAW, firstObjMsg);
  }
  numComputerWin += 1;
  return endGameMsg(LOSE, firstObjMsg);
};
