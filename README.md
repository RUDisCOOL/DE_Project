## How to Run This Project Locally

You can run this project locally using either Docker or Node.js. Follow the instructions below based on your preferred method.

### 1. Running with Docker

1. Ensure you have Docker installed on your computer.
2. From the root directory of the project, run the following command:

   ```bash
   docker compose up
   ```

3. **Note:** You have to generate the `.env` and `database-docker.env` files by running the provided setup [script](#step-4-set-up-environment-files).

### 2. Running with Node.js

Follow the steps below to run the project using Node.js.

#### Step 1: Install Prerequisites

1. Install Git
2. Install MySQL
3. Install Node.js
4. Create a new folder on your computer for the project.

#### Step 2: Clone the Repository

Clone the repository to your local machine:

```
git clone https://github.com/vvaibhavv11/DE_Project.git
```

Navigate into the project directory:

```
cd DE_Project
```

Switch to the `master` branch:

```
git checkout master
```

#### Step 3: Install Dependencies

Install the necessary dependencies using your preferred package manager:

```
npm install
```

or

```
pnpm install
```

#### Step 4: Set Up Environment Files

This step is crucial for running the project. The project requires two environment files: `.env` and `database-docker.env`.

You can generate these files by running the setup script:

```
npm run GenerateEnv
```

During the setup, you will be prompted to enter:

1. **MySQL Host URL:** You can type `docker` if you're using Docker, otherwise leave it blank to default to `localhost`.
2. **MySQL Password:** This is required and cannot be left blank.
3. **Database Name:** You can leave it blank to use the default `project`.

The script will create the `.env` and `database-docker.env` files with the appropriate variable with their values.

#### Step 5: Run the Project

Finally, start the development server:

```
npm run dev
```

or

```
pnpm dev
```

The server should start on port 5500. Make sure this port is open and not in use by another application.

### Additional Information

- The default MySQL user is `root`.
- If you want to use the email service, remember to edit the `.env` file to include your email credentials.
