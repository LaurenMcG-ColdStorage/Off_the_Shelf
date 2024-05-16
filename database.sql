-- PLEASE READ FIRST --
-- The database name is: off_the_shelf

-- These queries are arranged so that you can copy/paste them directly into your database interface 
-- of choice and execute them without needing to rearrange anything.

-- This stores the list of game mechanics
CREATE TABLE "mechanics" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- This stores the themes
CREATE TABLE "themes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- This will be persistent storage of games, regardless of collection
CREATE TABLE "games" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(50) NOT NULL,
	"min_players" INT NOT NULL
	"max_players" INT NOT NULL,
	"min_play_time" INT NOT NULL,
	"max_play_time" INT NOT NULL,
	"description" VARCHAR(1000),
	"image" VARCHAR(100) NOT NULL
	);

-- This will tie mechanics to games
CREATE TABLE "game_mechanic" (
	"game_id" INT REFERENCES "games",
	"mechanic_id" INT REFERENCES "mechanics"
	);

-- This will tie themes to games
CREATE TABLE "game_theme" (
	"game_id" INT REFERENCES "games",
	"theme_id" INT REFERENCES "themes"
	);

-- This will handle collections
CREATE TABLE "collections" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) UNIQUE NOT NULL
	);

-- This will tie collections to games
CREATE TABLE "collection_game" (
	"collection_id" INT REFERENCES "collections",
	"game_id" INT REFERENCES "games",
	"viewed" BIGINT,
	"played" BIGINT
	);
	
-- This will store all users
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(30) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"active_collection" INT REFERENCES "collections",
	"email" VARCHAR(100)
	);
	
 -- This will tie users to collections
CREATE TABLE "user_collection" (
	"user_id" INT REFERENCES "user", 
	"role" VARCHAR(10),
	"collection_id" INT REFERENCES "collections"
	);

-- This holds the data that a user wants to store about games they've played.
CREATE TABLE "history" (
	"user_id" BIGINT REFERENCES "user",
	"game_id" INT NOT NULL REFERENCES "games",
	"players" INT,
	"date" DATE,
	"notes" VARCHAR(1000)
	);
	
	INSERT INTO "mechanics" ("name")
VALUES ('Area Control'), 
('Contracts'), 
('Engine Building'), 
('Deck Building'),
('Cooperative'),
('Strategy'),
('Hidden Roles'),
('Worker Placement'),
('Dice Rolling'),
('Set Collection'),
('Trick Taking'),
('Drafting'),
('Tile Placement'),
('Bag Building'),
('Pool Building'),
('Time Travel'),
('Card Play'),
('Push Your Luck'),
('Puzzle'),
('Pattern Building'),
('Economy Manipulation'),
('Variable Set Up'),
('Hand Management'),
('Legacy'),
('Trading');

INSERT INTO "themes" ("name")
VALUES ('Steampunk'),
('Fantasy'),
('Mythology'),
('Animals'),
('Nature'),
('Horror'),
('Travel'),
('History'),
('Science Fiction'),
('Zombies'),
('Movie'),
('Post Apocalyptic'),
('Nautical'),
('Town Building'),
('Civilization'),
('Art'),
('Abstract')
;