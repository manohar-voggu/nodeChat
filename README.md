# nodeChat

Real Time Anonymous Chat app using Node.js, Express and MongoDB

## Prerequisites

[Node.js](https://nodejs.org/en/download/)

## Installation

run `npm i` from the root directory

## Usage:

Run `npm run dev` in command line

Note the port number displayed, say PORT

1. Open `http://localhost:PORT/register.html` in browser
2. Register yourself
3. Upon redirection to login page, login.
4. You will be redirected to messenger page

Repeat above 4 steps in another browser
You can message back and forth between the two sessions

## To be Implemented:

* List & Search users functionality
* Direct messaging between users
* Online/Offline status for users
* Log out all other users future
* Better UI using flutter

## Note:
* U'll need a (Mongo Atlas)[https://www.mongodb.com/cloud/atlas] account. Copy the Database url and assign it to DB_CONNECT variable found in .env file
