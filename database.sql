-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- The database name is: off_the_shelf

-- These queries are arranged so that you can copy/paste them directly into your database interface 
-- of choice and execute them without needing to rearrange anything.

-- This stores the list of game mechanics
CREATE TABLE "mechanics" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- This stores themes	
CREATE TABLE "themes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- This will be persistent storage of games, regardless of collection
CREATE TABLE "games" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(50) NOT NULL,
	"player_count" INT NOT NULL,
	"play_time" INT NOT NULL,
	"mech1_id" INT NOT NULL REFERENCES "mechanics",
	"mech2_id" INT NOT NULL REFERENCES "mechanics",
	"mech3_id" INT NOT NULL REFERENCES "mechanics",
	"theme_id" INT NOT NULL REFERENCES "themes",
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
	"collection_id" INT REFERENCES "collections",
	"role" VARCHAR(10)
	);
	
 -- This will tie users to collections
CREATE TABLE "user_collection" (
	"user_id" INT REFERENCES "user", 
	"role" VARCHAR(10),
	"collection_id" INT REFERENCES "collections"
	);

-- This will hold user game history logs
CREATE TABLE "history" (
	"user_id" BIGINT REFERENCES "user",
	"game_id" INT NOT NULL REFERENCES "games",
	"players" INT,
	"date" DATE,
	"notes" VARCHAR(1000)
	);
	