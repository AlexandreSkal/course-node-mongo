# FrontEnd
This is some screens from this application

LoginScreen:<br>
![image](https://user-images.githubusercontent.com/60991421/203364397-3f1e8651-6ab1-4464-af31-fdd293376c71.png)

SignupScreen:<br>
![image](https://user-images.githubusercontent.com/60991421/203364775-4285f32b-4aa3-40f0-80d1-499186d5b5ca.png)

ManageScreen:<br>
![image](https://user-images.githubusercontent.com/60991421/203365209-1e17bc5a-7769-4159-a8e4-16e6ab013408.png)

The application was developed using the passport module to define an authentication strategy. I used the bcrypt module to ensure unilateral encryption of the password and all information is saved in MongoDB.
We have a middleware that validates the user's permission level to allow access to some pages.
Nodemailer was used to notify the user via email when registering or when requesting a new password.

To run the program, perform the following steps:
set the information in the .env file
npm install to install all dependencies
run the command mongod --dbpath (authentication\data) to create the database.

resume of commands:
```
npm install
mongod --dbpath
```
