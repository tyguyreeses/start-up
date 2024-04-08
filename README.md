# start-up
## BYU CS 260 Startup Project

### Notes File:

Link to [Notes File](https://github.com/tyguyreeses/start-up/blob/e61dfe6a541e9408420c8a6f8063d51671e49c7b/notes.md)

### Use Markdown

How to use [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### Elevator Pitch

I'm working on building the basics of a job comparison website. While job searching, it can be a stressful experience to decide between two or more job offers. Comparing salary alone doesnt cut it when there are various other benefits like stock options, insurance, and retirement programs. This website will put it all in one place, clearly displaying which job performs better in separate categories to give the user the most informed choice for their career.

### Design

![Image of my sketch of a data entry screen and for a comparison screen](/public/assets/startup-design.jpg)

### Key Features

- Job information entry boxes with titles
- Salary, bonus, stock options (share count calculated to cost using real time stock price), insurance (medical, dental, vision)
- For simplicity, I will be ignoring taxes and other more complicated information to save for later
- Saved user login attached to previously entered job information
- Comparison screen with list of job names, take home yearly and monthly pay


## How I'll use each technology

- **HTML**
    - The scructure of the web page in the browser
- **CSS**
    - Formatting of the web page
- **JavaScript**
    - Validates the form was filled out correctly and shows error messages
    - Calculates the overall score of the entered info
    - Updates displayed stock price
    - Sends the data to the server via web sockets
- **Calling Web Services**
    - A save button that sends the entered job information to the server
    - retrieving the stock price of the job offer's stock options
- **Providing Web Services**
    - Recieves the job information from the browser and then saves it
- **Authentication**
    - Saved login information for a user so they can access previously entered job information
- **Storing Data Persistently**
    - Previous job offers entered into the system
- **Database Data**
    - Displays previously entered job offer information overviews
- **React**
    - Application ported to the React framework
- **Web Sockets**
    - I'm going to use web sockets to send a retrieve the entered job information
    - Real time example: updating the displayed stock price in real time

## HTML Deliverable

- **HTML Pages**
    - Pages represent the login screen, a job entry screen, a screen to compare all previously entered job offers, and an about page
**Links Betweeen Pages**
    - Each page is linked in a navigation menu in the header of each page
- **3rd Party Service Call Placeholder**
    - I will call a third party service to retrieve stock price data
- **Websocket**
    - I will display real-time information on a specified stock price
- **Login Placeholder**
    - I've included a placeholder for a login screen
- **Database Data**
    - I've included a screen to display previously entered job information, stored in the specified user's account
- **Images**
    - I've included a mockup of a logo for my website as an image

## CSS Deliverable

- **Header/Footer/Body**
    - I have implemented both a header and footer with a body element on each page
- **Navigation Elements**
    - I have inplemented a menu in my header to navigate between different pages
- **Responsive to Window Resizing**
    - My website resizes and reformats to match a phone screen and a computer screen
- **Application Elements**
    - Used constant whitespace between elements
- **Application Text Elements**
    - Consitent fonts throughout the website
- **Application Images**
    - Included a logo in both the tab and on the login screen

## JavaScript Deliverable

- **Future Login Support**
    - I've included username and password placeholders using local storage to store the entered information as well as displaying the username when "logged in." As of right now, "logging out" just clears the local storage.
- **Future Database Data**
    - The data I'll be storing in my future database will be the username and password login information as well as all previously entered job offers so the user can save data between sessions.
- **Future Websocket Functionality**
    - If it doesn't prove too difficult with my extremely limited background, the final product will find the current price of a stock based on the ticker symbol entered into the job entry form and will then perform live updates on the comparison screen. For now, I've implemented a placeholder that randomly assigns a stock price.
- **Application Interaction Logic**
    - It's still a little clumsy due to my lack of understanding how the big picture would look when designing my HTML and CSS, but interaction logic includes navigation between the entry and comparison screens and a logout button, as well as the functionality of consolidating the entered information into a two or three categories that are then displayed in rows on the comparison screen.
- **Future Features**
    - I have a couple plans for features I would like to add beyond the extent of this assignment once I have more time. They are as follows:
        - Incorporating tax information to give a more accurate representation of takehome salary
        - Adding a "signing bonus" field
        - Taking into account provided insurance and retirement benefits 
        - Potentially adding "expenses" information tied to the specific user to deduct monthly and yearly payments from all calculated yearly and monthly salaries. (long ways down the road)
        - Who knows? This might turn into a financial planner/budgeting website on top of a job offer comparison application.

## Web Service Deliverable

- **HTTP Service with Node and Express**
    - Node and Express are both utilized in my front- and back-end code
- **Frontend served up using Express static middleware**
    - Frontend is served up using Express
- **Your frontend calls third party service endpoints**
    - As part of a backend operation, my frontend file jobEntry.js calls Yahoo Finance's free stock information access system to get the price of a stock given a user-provided ticker symbol
- **Your backend provides service endpoints**
    - Endpoints are provided in index.js
- **Your frontend calls your service endpoints**
    - Calls are made in jobEntry.js and compare.js

## Login Deliverable

- **MongoDB Atlas database created** - Done!
- **Stores data in MongoDB** - Done!
- **User registration** - Done!
- **Existing user** - Entries are stored under the existing user
- **Use MongoDB to store credentials** - Stores the user information and their entries
- **Restricts functionality** - Entering information and comparing that information only works for existing users

## Websocket Deliverable

I wasn't sure how to make this mesh well with the overall functionality of my website, so I just added chat features to get the experience, even if I will most likely remove it later.
- **Backend Listeners for Websocket connection** - Done!
- **Frontend makes WebSocket connection** - Done!
- **Data sent over WebSocket connection** - Done!
- **WebSocket data displayed** - Messages sent between users are displayed in real time