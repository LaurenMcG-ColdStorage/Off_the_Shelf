const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const collectionRouter = require('./routes/collection.router');
const gamesRouter = require('./routes/games.router');
const historyRouter = require('./routes/history.router');
const selectablesRouter = require('./routes/selectables.router');
const recRouter = require('./routes/rec.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/games', gamesRouter);
app.use('/api/history', historyRouter);
app.use('/api/select', selectablesRouter);
app.use('/api/recommend', recRouter)

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
