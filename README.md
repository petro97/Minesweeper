# Minesweeper Game

This is a web-based Minesweeper game with three difficulty levels and an interactive UI. The project includes a timer, reset button, and flag count display, giving players the classic Minesweeper experience.

## Live version
Find the live version of the app [here](https://petro97.github.io/Minesweeper/)

### Features
Three Difficulty Levels:

* Beginner: Easy level for quick play
* Intermediate: Medium level for a challenge
* Expert: Hard level for advanced players


### Gameplay:

* Timer: Starts when the game begins and pauses when the player wins or loses.
* Reset Button: The reset button has a smiley icon that reflects gameplay status.
* Game States:
 - 😊 Playing
 - 😵 Game Over
 - 😎 Win

* Flag Count: Displays the number of flags placed on the board, helping track mines marked.

## Installation and Setup
Clone the repository and navigate to the project folder.
Install dependencies:

`yarn install`

Run the development server:

`yarn dev`

For production, build the app:

`yarn build`

Run the deploy command:

`yarn deploy`


### Testing
Run Tests: 

`yarn test`

Coverage Report: 

`yarn test:coverage`

Deployment
To deploy the game on GitHub Pages:

`yarn deploy`

