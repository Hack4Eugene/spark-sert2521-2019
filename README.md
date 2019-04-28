# Spark

[sert2521.stage.apps.mvpstudio.org](https://sert2521.stage.apps.mvpstudio.org)
SERT's code for the Spark challenge @ Hack for a Cause 2019.

# How to use!

Go to [sert2521.stage.apps.mvpstudio.org](https://sert2521.stage.apps.mvpstudio.org)

## Home page

Here you can view the profiles of people to give to. Notice the progress circle of how much more funding each person needs.
Click on any of the people to see more details and find out what you can donate to.

### Person Profile

Here you can either:

- donate to the person's general fund
- donate to a specific item

After you specify the amount you wish to donate, you will be directed to Paypal to complete your transaction.

## Admin Usage

With admin privileges, an admin can login and add users. Soon, they will be able to edit users, too!
First, the admin must login.
After loggin in, the admin will be able to make a new person profile.
(For your convenience, you can see the add person form from the menu)

### Add Person

Here, an admin can add a user, and take a photo to upload as they are using it in the field!

### Admin Center

Here, Admins can track progress of all of the donations by catagory and progress.
Once items are funded, an Admin will be able to check off that they have order the item.
Once the item is delievered to the person, the Admin can then check off that the item has been delievered!

## Installation for development

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
