# lab-21 Adventure Game

## Install Dependencies

in the command line, use `npm i` to install the dependencies

##To Run app

in the command line, use `npm run watch` to start the webpack-dev-server module. Now go to localhost:8080 to view the website.

There are 6 rooms in the a rectangle which the player can move between. Each time they enter a new room, there is a ~1/5 chance of encountering an enemy. This will prompt the user to choose either fight or run, with buttons for each action.

## To run tests

in the command line, assuming the karma-cli has been installed globally, use `karma start` to run the tests.

to run the linter, use `npm run lint` in the command line.

##BONUS POINT

I used random numbers so there's a chance of every interaction in every room you enter. I also used random numbers to determine the outcome of the player's action went faced with an enemy.

## What I did

The game is based (very very loosely) on this stupid ass old movie that my dad loves and has made me watch a bunch of times called Buckaroo Banzai Across the 8th Dimension. You play as Buckaroo Banzai and the Hong Kong Cavaliers. The goal is to collect 6 points, before you're killed by the bad guys. Each time a player enters a new room there is a random roll of 0-100(99.9999 etc. technically, but it's a lot easier to just type 100). Depending on the outcome of that roll, 1 of 4 different situations can occur. For 0-5(4.9999 etc) they lose, for 5-30 they enter an empty room, for 30-80 they gain a point, and for 80 and above they encounter an enemy. They have 2 choices when encountering an enemy, and both of those use a random roll to decide the outcome as well. If they choose to fight, they have a 50-50 chance of either losing or gaining a point. If they choose to run, they have a 20 percent chance of losing but an 80 percent chance of escaping unharmed. If the player gets all 6 points, the control pad will be hidden, and a message will appear that asks if they want to play again, along with a restart button. Hitting the button will reset the game to the conditions it was in to begin with, and they can play again. 
