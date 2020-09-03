// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
function processFirstItem(stringList, callback) {
  return callback(stringList[0]);
}

// ⭐️ Example Challenge END ⭐️

///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 *
 * In counter1, count is function scope. In counter2,  count is global scope. In counter1, count is only available within the function.
 *
 * 2. Which of the two uses a closure? How can you tell?
 *
 * counter1 because the inner counter function marks the closure and references count variable outside the scope of the inner function.
 *
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *
 * counter1 code would be better if you may need to assign the counter to multiple variables. With counter2, count is outside the scope of the function, so each time the function is run the count will increase. Therfore, it would be preferred only if you did not expect to assign the function to another variable and only needed to count once.
 */

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  };
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/* Task 2: inning() 

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
  let points = Math.round(Math.random() * 2);
  return points;
}

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(inning, numOfInnings) {
  let homeScore = 0;
  let awayScore = 0;
  for (let i = 1; i < numOfInnings; i++) {
    homeScore += inning();
    awayScore += inning();
  }
  return { Home: homeScore, Away: awayScore };
}

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */

//This was the first way I did it.

function scoreboard(getInningScore, inning, numOfInnings) {
  let homeScore = 0;
  let awayScore = 0;
  let currentScore = [];
  for (let i = 1; i <= numOfInnings; i++) {
    homeScore += inning();
    awayScore += inning();
    currentScore.push(getInningScore(i, awayScore, homeScore, numOfInnings));
  }
  return currentScore;
}

// function scoreboard(inning, numOfInnings) {
//   let homeScore = 0;
//   let awayScore = 0;
//   let currentInning = 0;
//   return function getScore() {
//     homeScore += inning();
//     awayScore += inning();
//     currentInning++;
//     return getInningScore(currentInning, awayScore, homeScore, numOfInnings);
//   };
// }

function getInningScore(currentInning, awayScore, homeScore, numOfInnings) {
  let endingNum = currentInning % 10;
  let inningWithSuffix;
  if (currentInning === numOfInnings) {
    inningWithSuffix = "Final Score";
  } else if (currentInning > numOfInnings) {
    return (inningWithSuffix = "The Game's Over!");
  } else if (endingNum == 1 && currentInning != 11) {
    inningWithSuffix = currentInning.toString() + "st" + " inning";
  } else if (endingNum == 2 && currentInning != 12) {
    inningWithSuffix = currentInning.toString() + "nd" + " inning";
  } else if (endingNum == 3 && currentInning != 13) {
    inningWithSuffix = currentInning.toString() + "rd" + " inning";
  } else {
    inningWithSuffix = currentInning.toString() + "th" + " inning";
  }
  return `${inningWithSuffix}: ${awayScore} - ${homeScore}`;
}

const game1 = scoreboard(inning, 9);
