# Off The Shelf

This Application Uses The Following Technologies:
- React
- Redux
- Express
- NodeJS
- PostgreSQL
- Passport
- Material UI

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Create Database and Table

All of the information that you need to start a database for this application is held within the ['database.sql'] file. It's organized so that everything should be a direct copy-paste into your interface.

## Development Setup Instructions

- Run `npm install`.
    - check the `package.json` to see all of the needed dependencies.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

Please change the session passowrd to something that is NOT superDuperSecret! It's just a template and is not, in fact, super, duper, or secret.

- Start postgres if it's not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Open a terminal and run `npm run server` to start the server.
- Open another terminal and run `npm run client` to start the client.
- Navigate to `localhost:5173` in your chosen browser.

## Off the Shelf - What Am I looking At?

I built this application to solve a problem that I bump into a lot during game nights: "What should we play?"
Sometimes we even find ourselves asking "What games do we even have?"

This app was built to be an accessible solution to those questions, and even a little more. I built it to do the following things:
- Add games to a database, and attach them to different collections
- Support multiple users, and provide them different levels of access to our data
- Make some basic recommendations about what games might be a good choice, given answers to a few questions
- Allow users to track data for the games that they've played
- Remove games from a collection
- View an entire collection of games
- Track basic view/play data for the games in a collection.

We do this in the following pages:
- Home 
- Collection
- Recommend
- Play History
- Manage
- Account

### Home
The home page is very simple: it has a bit of text that providea a basic overview of what Off the Shelf is, and it will also contain a register/login form if the user isn't currently logged in. This is also the only page that a user can visit while not logged in.

### Collection
This feature contains a stylized view of all games within a user's active collection. Currently it is just an image of the box art, and the title.

### Recommend
This feature contains a series of questions that ask about different details the user may be looking for in a board game. When all questions have been navigated through, a results page with the applicable games will be rendered. Each game has a few details displayed. This feature is currently structured to feel like a dialog.

### Play History
This feature is where a user can view a history of the games they've tracked, and add new games to the table. It takes in title, player count, and notes inputs.

### Manage
This feature is where a user can add or remove games from their collection. All games are rendered in small cards, with viewed/played counts visible. If a game is removed from the collection, it is removed from the collections table, but remains in the games table.

### Account
This allows users to change their role, or active collection.


## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2.
