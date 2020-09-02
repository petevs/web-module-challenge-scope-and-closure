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
 * In counter1, count is function scope. In counter2,  count is global scope. In counter1, count is only available within the function. In counter 2, the count variable won't reset each time the function is run.
 *
 * 2. Which of the two uses a closure? How can you tell?
 *
 * counter2 because it is referencing the count variable outside of its context. (The ability to access functions from a parent level scope in child level scope, even after the parent function has been terminated. Code that has been identified else where that we can use later. We can pass down but can't pass back up.) Inner variable references variables in outer scope is called a closure.
 *
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *
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

function scoreboard(getInningScore, inning, numOfInnings) {
  let homeScore = 0;
  let awayScore = 0;
  let currentScore = [];
  for (let i = 1; i <= numOfInnings; i++) {
    homeScore += inning();
    awayScore += inning();
    currentScore.push(getInningScore(i.toString(), awayScore, homeScore));
  }
  return currentScore;
}

function getInningScore(currentInning, awayScore, homeScore) {
  return `${currentInning} inning: ${awayScore} - ${homeScore}`;
}

// function game(sport) {
//   let score = 0;
//   return function win() {
//     score++;
//     return score;
//   };
// }

// const hockeyGame = game("hockey");
// console.log(hockeyGame());
// // console.log(hockeyGame());
// // console.log(hockeyGame());

// // const footGame = game("football");
// // console.log(footGame());
