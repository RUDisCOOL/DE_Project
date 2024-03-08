### DE Project

This is our final year Project of our engineering.

## How to run this project locally in your compute

To run this project locally follow the steps below

## Step 1

1. Install git
2. Install mysql
3. Install nodejs
4. Create a new folder in your computer

## Step 2

Clone the repository into you computer
```
git clone https://github.com/vvaibhavv11/DE_Project.git
```
cd into the directory
```
cd DE_Project
```
and make sure to change the branch to master
```
git checkout master
```

## Step 3

Install the necessary dependencies to run the project
```
npm i
```

## Step 4

This is the most important step to run the project. It require the .env file in main folder of the project and the file will contain the credentials of the database
```
MYSQL_HOST=""
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
```
copy this above into .env file and write the credentials of your database into quotes.
1. host means the ip address of your database
2. user means the name of user present in your database
3. password means the password of your username
4. database means the name of your database

## Step 5

Finally you can run the project by the running the command
```
node app.js 
```
this should start a server in port 5500 make sure the port is open.
