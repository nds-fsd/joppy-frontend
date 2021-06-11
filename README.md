# Welcome to DevRadar

Inspired by Joppy, DevRadar is a recruitment platform where the job opportunities are filtered to match your profile and preferences.

![Main screen](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/3.%20Main%20Page.PNG)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#app-tour">App Tour</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

DevRadar is the final project for the Full Stack Developer master offered by Nuclio Digital School. Built by [Laura Sosa](https://github.com/laurasosa93) and [Ernesto Celi](https://ernestoceli.com/).

The app was written from the ground up, minimizing the use of front end libraries to provide the greatest challenge and learning experience. We also built a custom API to handle user authentication, route protection, content filtering by user, email delivery, image storage and a real time chat.

### App Tour

#### As a developer looking for a job

You are welcomed by the login screen, having the option to also register as a new user.

![Login page](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/1.%20Log%20in%20page.PNG?raw=true)

As a first user, you won't have an account, so you go to the registration screen.

![Registration screen](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/2.%20Registration%20page.PNG?raw=true)

After completing your registration, the app will take you straight to the main screen. Here you will be able to accept, reject or leave for later the job positions that are offered. Tags that coincide with your preferences will be highlighted in green. As well as the salary if it's above your preference and the location, if it's the same.

![Main page](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/3.%20Main%20Page.PNG?raw=true)

At this point, you should also go to your profile and complete your information. You can add experience, education, languages and also edit the information you filled out at the start.

![User page](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/4.%20User%20Page.PNG?raw=true)

You can see the offers you've liked in your My Offers tab, and if a company likes your profile, you'll receive an email notification and chat with them in app.

![My offers page](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/8.%20Accepted%20offers%20from%20user%20side.PNG?raw=true)

#### As a company posting job offers

After a user is created for you, you'll be able to access your dashboard using the same login screen.

![Company dashboard](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/5.%20Company%20Dashboard.PNG?raw=true)

Here you can manage all your offers, see which candidate has interacted with each one and decide to either accept or reject their profiles. Once a candidate is accepted, the chat button will be enabled and you can start a conversation with them.

![New Offer modal](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/6.%20New%20Offer%20Modal.PNG?raw=true)

![Candidates modal](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/7.%20Candidates%20Modal.PNG?raw=true)

![Chat interface](https://github.com/nds-fsd/joppy-frontend/blob/master/Screenshots/9.%20Chat%20on%20both%20sides.PNG)

### Built With

The whole app (front end and backend) was built in Javascript using the following frameworks:

* [React](https://reactjs.org/) to build the front end, bootstrapped with Create React App
* [React Hook Form](https://react-hook-form.com/) to provide form validation
* [Express](https://expressjs.com/) as the backend framework
* [MongoDB](https://www.mongodb.com/) for the database
* [Mongoose](https://mongoosejs.com/) for object modeling and query handling
* [Nodemailer](https://nodemailer.com/about/) to handle emails
* [EJS](https://ejs.co/) was used for email templating
* [Socket.io](https://socket.io/) for the chat 

<!-- Getting Started -->
## Getting Started

<!-- Prerequisites -->
### Prerequisites
You need Node installed in your machine, and depending on if you'll use a local database or a remote one, you're gonna need Docker. The docker compose file is included with the repo, just replace the data with the credentials you'll use.
<!-- Installation -->
### Installation
Start by cloning this repo and the [backend](https://github.com/nds-fsd/joppy-backend) repo to your local machine.

Then you'll need to initialize the connection to the database. If you're using a local database, set up the docker-compose.yaml file with the corresponding data: username, password, database name and port selection. Then, the .ENV will have the same information as DATABASE_USER, DATABASE_PASSWORD and DATABASE_PORT.

If you're using a remote database, like MongDB Atlas, set it up and the copy the connection link. This link will then be pasted on the .ENV as DATABASE_URL constant.

Lastly, set up your authentication data for the email delivery and cloudinary account.
<!-- Usage -->
## Usage

Start the backend locally with `yarn devStart` and the frontend with `yarn start`.

Now it's time to populate the database with the information that will be shown to the users.

As we don't have a form to add the data for the Roles, Skills, Locations and Languages, these we'll need to add manually using a REST client like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

For Roles:
`POST ---> http://localhost/YOURPORT/positions`

Body:
```json
{
	"name": "The name"
}
```
For Skills:
`POST ---> http://localhost/YOURPORT/skill`

Body:

```json
{
	"skill": "The name"
}
```
For Locations:
`POST ---> http://localhost/YOURPORT/city`

Body:

```json
{
	"name": "The name"
}
```

For Languages:
`POST ---> http://localhost/YOURPORT/language`

Body:

```json
{
	"name": "The name"
}
```
And now you can start creating Companies, we suggest you use the same info, changing only the email and password, as the rest you'll be able to change later in the company dashboard.

`POST ---> http://localhost/YOURPORT/register`

Body:
```json
{
  "role": "COMPANY_ROLE",
  "photo": [ "https://link-to-your-image.fakehostingsite.com"],
  "tech": ["60b1287523456b0015860776"],
  "languages": ["60b129a12345bb0015c239b7"],
  "name": "Company",
  "email": "company@email.com",
  "password": "yourpassword",
  "bio": "The info of the company, you'll be able to edit all of this later",
  "location": "60b125eb5193bb0015c239a4"
}
```
Notice how some fields are filled with IDs from the database, that's why we populated those first.

After this you can run through the app as you saw on the app tour above.
<!-- Contributors -->
## Contributors
This project was built from start to finish by Laura Sosa:
* [GitHub](https://github.com/laurasosa93)

And Ernesto Celi:
* [Portfolio](https://ernestoceli.com)
* [GitHub](https://github.com/ernestoceli)
* [LinkedIn](https://www.linkedin.com/in/ernestoceli/)

<!-- Acknowledgements -->
## Acknowledgements

Thanks to [Nuclio Digital School](https://nuclio.school/?lang=en) and to our professors: [Jose Manuel Cano](https://github.com/jmcano94), [Carlos Arenas](https://github.com/carlosarenasf) and [Patricia Mateos](https://github.com/pattirock) for their constant support and mentoring. We hope you're as proud of this project as we certainly are.
