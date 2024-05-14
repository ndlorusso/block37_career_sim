require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgress://localhost/block37_career_sim');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const createTables = async () => {
    const SQL = `--sql
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews(
        id UUID PRIMARY KEY,
        txt VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL
    );

    CREATE TABLE items(
        id UUID PRIMARY KEY,
        details VARCHAR(255) NOT NULL,
        title VARCHAR(100) NOT NULL UNIQUE,
        review_id UUID REFERENCES reviews(id) NOT NULL,
        CONSTRAINT unique_review_id UNIQUE (review_id)
    );

    CREATE TABLE comments(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        review_id UUID REFERENCES reviews(id) NOT NULL,
        CONSTRAINT unique_user_id_review_id UNIQUE(user_id, review_id)
    );
    `;
    await client.query(SQL);
};

module.exports = {
    client,
    createTables,
};
// CONSTRAINT unique_review_id UNIQUE (review_id)
// CONSTRAINT unique_user_id_review_id UNIQUE(user_id, review_id)