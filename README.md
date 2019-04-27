# Spark

SERT's code for the Spark challenge @ Hack for a Cause 2019.

## Installation

To get Spark up and running, you will need a few things first:

**NPM** - You will need NPM to install Yarn, which is used to build the front-end.
To install NPM, run:

`sudo apt-get install npm`

Then, to install Yarn, run

`sudo npm install -g yarn`

**Docker** - This only applies if you are going to run a docker container.
Installation is fairly simple:

`sudo apt-get install docker`

### Setting up a test database connection

Skip this if you are only running this through Docker.

Create a file called `backend/src/main/resources/db.txt`, and inside of it
write and save the following:

```
mysql://sert_homeless:sert2521@db4free.net:3306/homeless
```

This will allow you to connect to a remote test database,
which is hosted through DB4Free.

## Running

To run the program, use the commands below:

```bash
$ ./gradlew build         # builds the frontend/backend
$ ./gradlew :backend:run  # runs the backend server
```

After starting the backend, you can visit the website at `http://127.0.0.1:8080`.

If you're working on the frontend and would prefer a hot-reloading instance, you can use:

```bash
./gradlew :frontend:run
```

Then you can reach the frontend at `http://127.0.0.1:3000`.

## Docker

First, you'll need to build the `webapp` Docker image. However, before you can, you must first build the app. This can
all be done by following the commands below:

```bash
$ ./gradlew build
$ docker build -t webapp .
```

Once the image is done, start the web server and MySQL database with:

```bash
$ docker-compose up
```
