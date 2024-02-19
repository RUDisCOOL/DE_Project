const express = require('express');
const app = express();
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '3434',
    database: 'project',
})


module.exports = pool;
