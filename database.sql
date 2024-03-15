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

--This stores the themes	
CREATE TABLE "themes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- This is a persistant table that holds all of the games. Games do not need to be tied to a collection
-- once entered to remain in the table.
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

-- This will be a table that stores each unique Collection made by users.
CREATE TABLE "collections" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) UNIQUE NOT NULL
	);

-- This is the junction table that ties collections to games, and also stores a bit of play data.
CREATE TABLE "collection_game" (
	"collection_id" INT REFERENCES "collections",
	"game_id" INT REFERENCES "games",
	"viewed" BIGINT,
	"played" BIGINT
	);

-- This holds all of the user data that we are collecting. It's not a lot, because we really don't need much.	
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(30) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"collection_id" INT NOT NULL REFERENCES "collections",
	"role" VARCHAR(10) NOT NULL
	);


CREATE TABLE "history" (
	"user_id" BIGINT REFERENCES "user",
	"game_id" VARCHAR NOT NULL,
	"date" DATE,
	"notes" VARCHAR(1000)
	);
		