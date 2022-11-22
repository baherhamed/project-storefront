## Setup

- npm install // used to install dependensices

## Variables

use .env file to set the following variables:

- host refere to server ip or domain.
- DATABASE refere to database used in production;
- DATABASE_TEST refere to test database;
- USER refre to username which used to connect database;
- PASSWORD refre to password which used to connect database;
- ENV refere to environment used (dev || prod || test);
- PORT refere to port used to run app on server;
- BCRYPT_PASSWORD used in set JWT token;
- SALT_ROUNDS number use to slat password used for JWT;
- TOKEN_SECRET refere to secret used in set token;

## backend and database run on port

    by default port is : 3000; defined on .env file if this definition not exisit it will take another port from server file;

## connecting to databse

     - in file database.json ther are two objects with values needed to connect to database   depening on environment (dev || test) may also add (prod) if desired.
        * values in every enviroment is:
            # host ==> server or domain or ip;
            # database ==> database name which connect to it depending on environment;
            # user and password ==> credintional used to connecting database;

    go to terminal and type  psql -U postgres to run pg as with admin user in first time then do the following

    1- create database with CREATE DATABASE <database name>;
    2- create user to used to connect database with CREATE USER <username> WITH PASSWORD <password>;
    3- set privileges to user with GRANT ALL PRIVILEGES ON DATABASE <database name> TO <database user>;
