const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function hashPassword(password) {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
}

async function checkHashPassword(password, hash) {
	const isValid = await bcrypt.compare(password, hash);
	return isValid;
}

async function create_table() {
	pool.query(
		'CREATE TABLE IF NOT EXISTS authentication(user_name CHAR(50),user_email CHAR(50),user_password CHAR(200),PRIMARY KEY(user_name));'
	);
}

function tocheckusername(common_data) {
	let checkdata = new Promise((resolve) => {
		let sql = `SELECT user_name FROM authentication WHERE user_name = "${common_data}";`;
		pool.execute(sql, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				if (result.length > 0) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		});
	});
	return checkdata;
}

function tocheckpassword(signup_Data) {
	let checkForPassword = new Promise((resolve) => {
		let sql = `SELECT user_password FROM authentication WHERE user_name = "${signup_Data.username}";`;
		pool.execute(sql, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				if (result.length > 0) {
					let check = checkHashPassword(
						signup_Data.password,
						result[0].user_password
					);
					resolve(check);
				} else {
					resolve(false);
				}
			}
		});
	});
	return checkForPassword;
}

async function datatosql(signup_Data, callback) {
	let hashedPassword = await hashPassword(signup_Data.password);
	let sql = `INSERT INTO authentication(user_name,user_email,user_password) 
    VALUES(?,?,?);`;
	let check = await tocheckusername(signup_Data.username);
	if (check === false) {
		if (signup_Data.password === signup_Data.confirmPassword) {
			pool.execute(
				sql,
				[signup_Data.username, signup_Data.email, hashedPassword],
				(err, result) => {
					if (err) {
						console.log(err);
						callback(err, null);
					} else {
						console.log('Data inserted successfully');
						callback(null, result);
					}
				}
			);
		} else {
			callback('Password does not match!', null);
		}
	} else {
		callback('Username already exists!', null);
	}
}

async function checkDataForLogin(login_Data, callback) {
	let checkUsername = await tocheckusername(login_Data.username);
	let checkPassword = await tocheckpassword(login_Data);
	if (checkUsername === true) {
		if (checkPassword === true) {
			callback(null, 'Login successful');
		} else {
			callback('Password is incorrect!', null);
		}
	} else {
		callback('Username does not exist!', null);
	}
}

function add_data_for_signup(signup_Data) {
	return new Promise((resolve, reject) => {
		datatosql(signup_Data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

function add_data_for_login(login_Data) {
	return new Promise((resolve, reject) => {
		checkDataForLogin(login_Data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

module.exports = {
	create_table,
	add_data_for_signup,
	add_data_for_login,
	tocheckusername,
	datatosql,
};
