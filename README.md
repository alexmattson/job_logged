<a href='http://www.joblogged.com'>
	<img src="https://s13.postimg.org/lnbhemlav/logo.png" height="150">
</a>


[Production link][production]

[Heroku link][heroku]

[production]: http://www.joblogged.com
[heroku]: http://joblogged.herokuapp.com

## Description

Managing all the intricacies of the job search process can be difficult; this site aims to make it a little bit easier for the user. No more messing around with nasty spreadsheets, we will provide a repository for all your details of the job search process!

## Technology Stack

| Area               | Software      | Misc. |
| ---------------    |:-------------:| ---: |
| Frontend           | React / Redux | Single Page App |
| Backend            | Rails 5.0     |  Monolithic Backend |
| Hosting      		   | Heroku        | |
| Repo      		   | GitHub        ||

## Features

**NB:** *the following features are allows listed from top of the picture to the bottom*

### Home / Dashboard

![logo.png](https://s14.postimg.org/qo8oa76f5/Screen_Shot_2016_09_06_at_12_08_53_PM.png)
(image 1)

#### Search Bar

The search bar has an auto complete feature and allows search of company name and job title.

#### Application Chart

The Application Chart, found at the top of the home screen, is built using the ChartJS library. It sorts data of days since the user has signed up in the x-axis and applications sent on each of those days in the y-axis. This is all shown in the blue chart on `image 1` above. Finally, this chart is overlain on top of a data set of sent application frequency of other users. Depicted by the gray chart in the same image.

#### Appication Forms

On the home page there are four (4) forms. Each of these forms has a custom written animated transition and will constitute a large part of the user interaction with the site. As such great care has been given into making them easy and intuitive to use.

- New - Allows a user to create a new application. Only requires a company name and job title in order to keep the interaction sort and the user moving through the site.
- Progress - This for is used to push and application on. It is structured to add an event and the event in turn is the mechanism that pushed the app.
- Rejected - utilizes the same functionality as the search menu to make finding and setting the rejected application extremely easy.
- Offer - Same as rejected but sets the application to an offer state.


#### Application Index

I list of all the applications a user has ever created. Every column can be sorted alphabetically; there is a page length selection and finally a search box that filters the list, searching through any word in the chart.

__________

### Application Page

![logo.png](https://s9.postimg.org/7fp0n106n/application.png)
(image 2)

#### Application Forms

These forms are extremely similar to the ones on the home page (see above).

- Edit - Allows a user to update the company name and job title of the application.
- Progress - Same as the one on the home page but doesn't need the user to select which application.
- Delete - Allows the user to delete the application.

#### Progress Bar

Shows how far along the user’s are in the process with the current application. Get's its information from the events (see `Events` below).

#### Gmail Integration

This module allows the user to link their Gmail account. It then takes whichever email is listed in the contact and pulls all the email from that contact form their email. In `image 2` the auth has already been performed. Please see `image 3` below for an example of the uncompleted auth form:

![logo.png](https://s13.postimg.org/pfiq9tuxz/gmail_auth.png)
(image 3)


#### Contact

Allows the user to add and edit a contact for the application.

#### Contact Map

Hooks into the Google maps api and pulls the address from the contact to make a map of the location for the office of the company that the user is applying to.

#### Events

Allows the user to Create, Update, and Delete events for the application. Events have the option of being a number of types:
- Application - general application event
- phone - Phone interview or call
- on-site - On-site interview or meeting
- Rejected - Received a rejection
- Offer - Received an offer
- Other - a catch all for the rest of events

These types must be chosen for every event added and is used in order to update the progress of the application.

Finally, any event added on an individual application is used to populate the users calendar on the profile page.

__________

### Profile Page

![logo.png](https://s13.postimg.org/vj0atql7r/profile.png)

(image 4)

#### Header

The header keeps track of the following general data for the user:
- Length of job search in days - Calculated as days since the account was create
- Number of applications sent
- Number of applications sent compared to others - This current compares the Number of applications sent to a user that sends out 250 applications
- Responses - Calculated as any application whose progress is past the default stage.
- Response Percentage - Responses / Applications sent
- Offers
- Offer Percentage - Offers / Applications sent

#### Calendar

Pulls all events from all the users applications and puts them in one easy to use calendar. Every event is a link to the corresponding application page.


## Future Direction

I plan to continue the project with the following features:

### Offer Management

Create a database table and full integration for the details of an offer (i.e. Base Salary, Equity, Signing Bonus, Date Offer Expires). With this, create a page for an individual to compare and manage the current open offers.

### Files Management

Use AWS to allow the user to upload resume/cover-letter, and any other documents they wish, to a "Files" module on the application page.

### Interview Questions

Allow user to enter interview questions for a company and what they believe the correct answer to be. These then get pooled, propagated and displayed across every user with an application for that company. Other user can then change the answer if the feel they have a better answer.

Further more you can utilize there questions to make a small quiz feature that takes all the questions in the database and allow the user to go through and quiz themselves to prep for interviews.

---
Developed by [Alex Mattson](http://www.alexmattson.com)
