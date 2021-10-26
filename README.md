# Project: Home Budget Economy (Web Development)

<br>

## Description


<br>

## Main Dependencies used


<br>

## How to use?

These are some details that will help you understand the control flow in the project.

<br>

### Prerequisites 

* Node.js should be installed on your PC.
* Backend uses commonJS imports(26/10/2021). So check for dependcy issues since this will be soon deprecated.
* Please `npm install` all packages and dev packages for server and client side before running anything. Refer the Important Commands below for instructions.

<br>

### Important Commands

* Server(Backend). Refer `./economy/package.json`. Use in `./economy/` directory:
    * `npm run start` : Starts the server using node.
    * `npm run server` : Starts the server using nodemon.
    * `npm run dev` : Uses concurrently package to run both server and client concurrently.
    * `npm run client-install` : Install the necessary dependencies of client react app from this directory.
    * `npm run client` : Starts the client react app in client from this directory.
* Client(Frontend). Refer `./economy/client/package.json`. Use in `./economy/client/` directory:
    * `npm start` : Starts the client react app.

<br>

### Website Navigation

* `/` : Home Page for basic information
* `/auth/` : Authentication Page for both sign in and sign up
* `/dashboard/budgeter/` : Budgeter Page for viewing, creating, editing and deleting user entries. Accesible after authentication.
* `/dashboard/analytics/` : Analytics Page for viewing consolidated data in area chart form in order to get an introspective overview over spending habits. Accesible after authentication.

<br>

## File Structure and Relations

**ALL INSIDE ECONOMY FOLDER**

### Backend

> config  
>> default.json  

> models  
>> User_Transaction.js  
>> User.js  

> reference  
> routes  
>> API
>>> user_transactions.js  
>>> users.js

>> middleware
>>> admin.js  
>>> auth.js  

> package.json  
> server.js  

### Frontend

<br>

## Release 1 features

* APIs are made for users and user_transactions data base and both are provided with admin priviliges.
* Adequate APIs are built for the **Backend** for existing features. 
* Authentication API is also built for the user_transactions data base.
* Client side is a **React-app**.
* Currently (26/10/2021), 4 webpages are present in the website: Home, Authentication(Sign in, Sign up), Budgeter and Analytics (Analytics is still incomplete).
* Authentication Backend and UI requires no fixes.
* User can view, add, edit and delte entries/transactions in Budgeter.

<br>

## Release 2 tasks

### Realease 1 Fixes (Need to be done)

* Improve the verifier for sign up authentication. Should recognize valid email IDs. Should have strong password. Username should not exceed more than 16 characters.
* Modularize Budgeter into Modal and Grid Components.
* Fix Budgeter UI.
* Add Media queries for existing features
* Remove any unnecessary/unused imports. 
* Add Analytics.

<br>

### Release 2 Features (TO BE PLANNED AND ELABORATED FURTHER)

* Add features to Budgeter such as timeline sidebar and collapsible groups.
* Add a customer feedback section which should be visible to all users.

To be finalised:

* Reinforcement learning agent to make the customer experince more interactive. Can also use it for future projection or learning spending habits.
* Adding a feature to add or delete groups. (To personalize groups for various occupations.)
* User profile section.

<br>

## Extra Notes

* [Github URL](https://github.com/sgr98/sdg-web-dev-semester5)
* Important keys are present in `./economy/config/default.json` :
    * `mongoURI` : My MongoDB Atlas URI
    * `jwtSecret` : Key for json web token
    * `adminPassword` : Password for admin priviliges
* Server runs on PORT:5000
* Client runs on PORT:3000

<br>

## Resources

<br>

## Contact

Sagar Singh  
cs19b038@iittp.ac.in  
Indian Institute of Technology, Tirupati.   