# ExamBit
ExamBit is an Online Platform, where Organization/Institutes can conduct Exam. Admin can grant/revoke the permission of Supervisor. Supervisor
can create objective paper and can also upload pdf for subjective paper. Supervisor can enable Webcam, Audio Recoding and sets duration for test.
Student can register for the test by the registration link provided by the Supervisor and after registration Test link will be send to the registered Email.
Supervisor can create group and students can join the groups,Supervisor can also assign assignment to students. Supervisor can see result in graphical form and can download result in excel format.

## Features of ExamBit
![Features Image](https://github.com/mayankaggarwal098/ExamBit/blob/master/ScreenShots/Features.png)

[![HomeScreen](https://github.com/mayankaggarwal098/ExamBit/blob/master/ScreenShots/HomeScreen.png)](https://youtu.be/NPLoxiDHNc8)
 You can view screenshot of project in ScreenShots folder.

## How to run ?

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### 1) Clone the repository
```
git clone https://github.com/mayankaggarwal098/ExamBit.git
```

### 2) Change directory
```
cd ExamBit
```
### 3) Install Dependencies
```
npm i
```

### 4) Change directory
```
cd client
```
### 5) Install Dependencies
```
npm i
```

### 6) Setting Config.

Create dev.js file in config folder and write below code in it:

```
module.exports = {
  MONOGOURI: "mongodb://localhost/exambit",
  jwtPrivateKey: <KEY>,
  SENDGRID_API_KEY:
    <your sendgrid api key>,
  EMAIL: <email id used in sendgrid>,
};
```

### 7) Create Admin

open index.js file (in root folder)
call createadmin function:

```
createadmin();
```

### 8) Start the Server.

open cmd prompt in root folder and write:
```
nodemon
```

this will create admin after that remove the `createadmin()` invocation from index.js and restart the server.

open cmd prompt in client folder  and write:
```
npm start
```

Open up your browser and head over to:
http://localhost:3000/

### 9) Login to Admin portal
```
Email: admin@admin.com
Password: admin
```
When Supervisor signed up , then request goes to admin ,If admin gives the permission to supervisor then only supervisor can login to their portal.

## Project Demo

https://youtu.be/NPLoxiDHNc8


