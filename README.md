# DE Project

This is our final year project for engineering.

## Running the Project Locally

There are two ways to run this project locally:

### 1. Using Docker

1. Ensure Docker is installed on your computer.
2. Create a `.env` file in the root of the project directory (details below).
3. Run the following command from the root of the project:

   ```
   sudo docker compose up
   ```

### 2. Using Node.js

Follow these steps:

#### Step 1: Install Required Tools

Ensure the following tools are installed on your computer:

1. Git
2. MySQL
3. Node.js

#### Step 2: Clone the Repository

1. Create a new folder on your computer.
2. Clone the repository into this folder:

   ```
   git clone https://github.com/vvaibhavv11/DE_Project.git
   ```

3. Navigate into the project directory:

   ```
   cd DE_Project
   ```

4. Switch to the `master` branch:

   ```
   git checkout master
   ```

#### Step 3: Install Dependencies

You can use any package manager to install the necessary dependencies:

- Using npm:

   ```
   npm install
   ```

- Using pnpm:

   ```
   pnpm install
   ```

#### Step 4: Configure Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the following content to the `.env` file, replacing the placeholder values with your actual credentials:

   ```
   MYSQL_HOST=""
   MYSQL_USER=""
   MYSQL_PASSWORD=""
   MYSQL_DATABASE=""
   SENDER_USER=""
   SENDER_PASS=""
   ```

   - **MYSQL_HOST**: The IP address of your MySQL database.
   - **MYSQL_USER**: Your MySQL username.
   - **MYSQL_PASSWORD**: Your MySQL password.
   - **MYSQL_DATABASE**: The name of your MySQL database.
   - **SENDER_USER**: The email address used to send messages.
   - **SENDER_PASS**: The app-specific password for the above email address, which can be generated from your email service provider.

#### Step 5: Run the Project

Start the development server with one of the following commands:

- Using npm:

   ```
   npm run dev
   ```

- Using pnpm:

   ```
   pnpm dev
   ```

The server should start on port `5500`. Ensure that this port is open on your system.
