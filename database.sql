-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--This table stores all of the user data required to operate the application
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(30) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"collection_name" VARCHAR(40) NOT NULL,
	"role" VARCHAR(10) NOT NULL
	);

--This table will store all of the information needed for collection tracking, as well as a small amount of analytics
CREATE TABLE "collection" (
	"name" VARCHAR(40) NOT NULL,
	"game_id" INT NOT NULL,
	"viewed" BIGINT,
	"played" BIGINT
	);

-- This table stores play session hitory data for users.
CREATE TABLE "history" (
	"user_id" BIGINT REFERENCES "user",
	"game_id" VARCHAR NOT NULL,
	"date" DATE,
	"notes" VARCHAR(1000)
	);

-- Mechanics is a small table that stores the different selectable game mechanics.
-- We've made a table for it for better scalability
CREATE TABLE "mechanics" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- Themes stores all of the different avilable themes or flavors that a game might have.
CREATE TABLE "themes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20)
	);

-- Games stores all of the games that have been entered into any collection.
-- All games will persist regardless of whether they remain in any collection
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
	