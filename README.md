# start-up
## BYU CS 260 Startup Project

### Notes File:
Link to [Notes File](https://github.com/tyguyreeses/start-up/blob/e61dfe6a541e9408420c8a6f8063d51671e49c7b/notes.md)

### Use Markdown
How to use [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### Elevator Pitch

I'm working on building the basics of a job comparison website. While job searching, it can be a stressful experience to decide between two or more job offers. Comparing salary alone doesnt cut it when there are various other benefits like stock options, insurance, and retirement programs. This website will put it all in one place, clearly displaying which job performs better in separate categories to give the user the most informed choice for their career.

### Design
![Image of my sketch of a data entry screen and for a comparison screen](/startup-design.jpg)

### Key Features
- Job information entry boxes with titles
- Salary, bonus, stock options (share count calculated to cost using real time stock price), insurance (medical, dental, vision)
- For simplicity, I will be ignoring taxes and other more complicated information to save for later
- Saved user login attached to previously entered job information
- Comparison screen with list of job names, take home yearly and monthly pay


## How I'll use each technology
**HTML**
- The scructure of the web page in the browser

**CSS**
- Formatting of the web page

**JavaScript**
- Validates the form was filled out correctly and shows error messages
- Calculates the overall score of the entered info
- Updates displayed stock price
- Sends the data to the server via web sockets

**Calling Web Services**
- A save button that sends the entered job information to the server
- retrieving the stock price of the job offer's stock options

**Providing Web Services**
- Recieves the job information from the browser and then saves it

**Authentication**
- Saved login information for a user so they can access previously entered job information

**Storing Data Persistently**
- Previous job offers entered into the system

**Database Data**
- Displays previously entered job offer information overviews

**React**
- Application ported to the React framework

**Web Sockets**
- I'm going to use web sockets to send a retrieve the entered job information
- Real time example: updating the displayed stock price in real time

## HTML Deliverable
**HTML Pages**
- Pages represent the login screen, a job entry screen, a screen to compare all previously entered job offers, and an about page
**Links Betweeen Pages**
- Each page is linked in a navigation menu in the header of each page
**3rd Party Service Call Placeholder**
- I will call a third party service to retrieve stock price data
**Websocket**
- I will display real-time information on a specified stock price
**Login Placeholder**
- I've included a placeholder for a login screen
**Database Data**
- I've included a screen to display previously entered job information, stored in the specified user's account
**Images**