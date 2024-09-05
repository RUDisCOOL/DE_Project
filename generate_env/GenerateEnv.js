const fs = require('fs');
const readline = require('readline-sync');

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

async function createEnvFiles() {
    try {
        console.log(`${colors.cyan}leave any field for the default expect password${colors.reset}`);
        let mysqlHost =  readline.question(`${colors.yellow}Enter the host URL for Docker  (type "database" for Docker): ${colors.reset}`);
        if (!mysqlHost) {
            mysqlHost = "localhost";
            console.log(`${colors.green}Default host set to 'localhost'.${colors.reset}`);
        }
        
        let mysqlPassword = readline.question(`${colors.yellow}Enter your MySQL password: ${colors.reset}`, { hideEchoBack: true, mask: "*"});
        if (!mysqlPassword) {
            console.error(`${colors.red}MySQL password is required.${colors.reset}`);
            return;
        }
        
        let mysqlDatabase = readline.question(`${colors.yellow}Enter the name of your database(default: project): ${colors.reset}`);
        if (!mysqlDatabase) {
            console.log(`${colors.green}No database name provided, using default value 'project'.${colors.reset}`);
            mysqlDatabase = "project";
        }
        
        let mysqlUsername = readline.question(`${colors.yellow}Enter your MySQL username (default: root):${colors.reset}`); 
        if (!mysqlUsername) {
            console.log(`${colors.green}No username provided, using default value 'root'.${colors.reset}`);
            mysqlUsername = "root";
        }


        const generalEnv = `
MYSQL_HOST="${mysqlHost}"
MYSQL_USER="${mysqlUsername}"
MYSQL_PASSWORD="${mysqlPassword}"
MYSQL_DATABASE="${mysqlDatabase}"
SENDER_USER=youremail@example.com
SENDER_PASS=your pass`.trim();

        const databaseDockerEnvContent = `
MYSQL_DATABASE="${mysqlDatabase}"
MYSQL_PASSWORD="${mysqlPassword}"
MYSQL_ROOT_PASSWORD="${mysqlPassword}"`.trim();

        fs.writeFile('./database-docker.env', databaseDockerEnvContent, (err) => {
            if (err) {
                console.error(`${colors.red}Error creating the database-docker.env file:${colors.reset}`, err);
            } else {
                console.log(`${colors.green}database-docker.env file created successfully!${colors.reset}`);
            }
        });

        fs.writeFile('./.env', generalEnv, (err) => {
            if (err) {
                console.error(`${colors.red}Error creating the .env file:${colors.reset}`, err);
            } else {
                console.log(`${colors.green}.env file created successfully!${colors.reset}`);
            }
        });
        console.log(`${colors.cyan}The files are created successfully, but if you want to use the email service, edit the .env accordingly.${colors.reset}`);

    } catch (error) {
        console.error(`${colors.red}An error occurred:${colors.reset}`, error);
    }
}

createEnvFiles();
