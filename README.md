# GA-Project-4


## Project Description
Users can create vocabulary lists for different media they are following: books, tv, movies. They can also add notes and write example sentences. A form will be available in the React frontend for users to create, edit, and delete media and vocab. A Rails backend will save the data.

An explanation of the major challenges you expect to face while building this app.
A section clearly defining MVP and POST MVP.

**MVP**

User Auth(Login/Register)

User creates a Media form

User adds, edits, and deletes vocab from Media

**POST MVP**

VoiceRSS text-to-voice API call to aid pronunciation 

Search bar

Click-and-drag vocab

## Entity Relationship Diagram (ERD) 
![ERD](https://github.com/PurpleTatsu/GA-Project-4/blob/master/P4.png)

## Wireframes 
![Home](https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/langhome.png?raw=true)
![Vocab](https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/media%20wireframe.png?raw=true)

## API Endpoint Documentations

/auth/register	*for User registration*

/auth/login	*for User login*

/auth/verify	*for User verification*

/media/:mediaId/ *for Media - Read Index and Create*

/media/:mediaId/vocab	*for Vocab - Read Index and Create*

/media/:mediaId/vocab/	*for Vocab - Read Show, Update, and Delete*


<!-- 
| Component     | Priority| Estimated Time  | Time Invested  |Actual Time |
| ------------- |:-------------:| -----:| -----:| -----:|
| Adding form for Vocab| H |3.5hrs  | 3hrs | 3hrs |
| Auth| H | 6hrs   | 6hrs | 6hrs |
| Adding form for media| H     | 3.5hrs    | 3hrs | 1hr |
| Design| M     | 4hrs    |  | 16hrs | -->

## Issues and Resolutions

- User would not stay logged in while navigating site.
Created handleVerify function to maintain current user.

- Edit/Update Vehicle Form did not import current state to prepopulate form and make it easier to edit. 
The setEdit function needed to be moved out of the Edit Vehicle page; from App.js it needed to be called in the Vehicle Page render and component, specifically in the onClick of the Edit button.

- Edit/Update initially didn't work for several days because the function setEdit was incorrectly being used as the function, and then props and state weren't handled correctly.