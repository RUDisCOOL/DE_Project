# DE Project

This is our final year Project of our engineering.

## How to run this project locally in your computer

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

Install the necessary dependencies to run the project, Now you can use any package manager you want

```
npm i
```

```
pnpm i
```

## Step 4

This is the most important step to run the project. It requires the .env file in main folder of the project and the file will contain the credentials of the database and the email-id which will be used to collect the message from the user

```
MYSQL_HOST=""
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
SENDER_USER=""
SENDER_PASS=""
```

Copy this into .env file and write the credentials of your database and email-id into quotes.

1. **MYSQL_HOST** is the ip address of your database
2. **MYSQL_USER** is the username of your mySQL account
3. **MYSQL_PASSWORD** means the password for your username
4. **MYSQL_DATABASE** means the name of your database
5. **SENDER_USER** means the email-id which will be used to send the email
6. **SENDER_PASS** is the app-password for your email-id, which can be accessed from your email service provider

## Step 5

Finally you can run the project by the running the command

```
npm run dev
```

or

```
pnpm dev
```

this should start a server in port 5500 make sure the port is open.
