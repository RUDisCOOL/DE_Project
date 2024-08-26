const fs = require('fs');
const readline = require('readline');

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function createEnvFiles() {
    try {
        // Prompt user for MySQL password and email app password
        console.log(colors.cyan + "leave any field for the default expect password" + colors.reset);
        let mysqlHost = await askQuestion(colors.yellow + 'Enter the host URL for Docker (type "database" for Docker): ' + colors.reset);
        if (mysqlHost === "") {
            mysqlHost = "localhost"
            console.log(colors.green + "Default host set to 'localhost'." + colors.reset);
        }
        let mysqlPassword = await askQuestion(colors.yellow + 'Enter your MySQL password: ' + colors.reset);
        if (mysqlPassword === "") {
            console.error(colors.red + "MySQL password is required." + colors.reset);
            return
        }
        let mysqlDatabase = await askQuestion(colors.yellow + 'Enter the name of your database: ' + colors.reset);
        if (mysqlDatabase === "") {
            console.log(colors.green + "No database name provided, using default value 'project'." + colors.reset);
            mysqlDatabase = "project"
        }

        const generalEnv = `
MYSQL_HOST="${mysqlHost}"
MYSQL_USER="root"
MYSQL_PASSWORD="${mysqlPassword}"
MYSQL_DATABASE="${mysqlDatabase}"
SENDER_USER=youremail@example.com
SENDER_PASS=your pass`.trim();

        // Define the content for the .env file
        const databaseDockerEnvContent = `
MYSQL_DATABASE="${mysqlDatabase}"
MYSQL_PASSWORD="${mysqlPassword}"
MYSQL_ROOT_PASSWORD="${mysqlPassword}"`.trim();

        // Write the content to database-docker.env
        fs.writeFile('./database-docker.env', databaseDockerEnvContent, (err) => {
            if (err) {
                console.error(colors.red + 'Error creating the database-docker.env file:' + colors.reset, err);
            } else {
                console.log(colors.green + 'database-docker.env file created successfully!' + colors.reset);
            }
        });

        fs.writeFile('./.env', generalEnv, (err) => {
            if (err) {
                console.error(colors.red + 'Error creating the .env file:' + colors.reset, err);
            } else {
                console.log(colors.green + '.env file created successfully!' + colors.reset);
            }
            rl.close();
        });
        console.log(colors.blue + "The default user for MySQL is 'root'." + colors.reset);
        console.log(colors.cyan + "The files are created successfully, but if you want to use the email service, edit the .env accordingly." + colors.reset);
    } catch (error) {
        console.error(colors.red + 'An error occurred:' + colors.reset, error);
        rl.close();
    }
}

createEnvFiles();
