# ToDo

![output-onlinepngtools](https://user-images.githubusercontent.com/25462600/236182896-aca28eac-83f3-4c69-8997-341751f42e3e.png)

## Description

A new revolutionary way to keep track of your tasks everyday.
Plan, manage and track all your team's tasks in one easy-to-use platform.

![Screenshot 2023-05-04 at 11-55-18 ToDo](https://user-images.githubusercontent.com/25462600/236172646-d1884b7e-863a-4181-ae0c-7ff4931a863e.png)

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend!

- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

List of other features outside of the MVPs scope

Homepage

- search button
- order tasks according to their priority and status

Task

- share with another user

## ROUTES:

- GET /
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to / if user logged in
  - body:
  - username
  - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form
- POST /auth/login
  - redirects to / if user logged in
  - body:
  - username
  - password
- POST /auth/logout

  - ends current user's session
  - redirects to /

- GET /task
  - renders all the tasks that were created by logged user + the create button
- POST /task/create

  - redirects to / if user is not logged in
  - body:
  - name
  - description
  - priority
  - status
  - image
  - user id
  - share with

- GET /task/details/:id
  - redirects to / if user is not logged in
  - renders the task detail page
  - includes parameters of the task
  - edit and delete button
- POST /task/update/:id/
  - redirects to / if user is not logged in
  - body:
  - name
  - description
  - priority
  - status
  - user id
- GET /task/delete/:id
  - redirects to / if user is not logged in
  - deletes current task and redirects to /task/

## Models

User model

```
username: String
password: String
```

Task model

```
name: String,
description: String
priority:
	type: String,
	enum: ["high", "medium", "low"],
	default: "low"
state:
	type: String
	enum: ["pending", "done"]
	default: "pending"
creator:
  	type: Schema.Types.ObjectId
  	ref: "user"
sharedWith: String
image: String

```

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/dbravojuanico/ToDo_M2project)

[Deploy Link](https://todo-m2project.adaptable.app/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
