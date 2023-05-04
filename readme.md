# ToDo

![output-onlinepngtools](https://user-images.githubusercontent.com/25462600/236182896-aca28eac-83f3-4c69-8997-341751f42e3e.png)

## Description

A new revolutionary way to keep track of your tasks everyday.
Plan, manage and track all your team's tasks in one easy-to-use platform.

![Screenshot 2023-05-04 at 11-55-18 ToDo](https://user-images.githubusercontent.com/25462600/236172646-d1884b7e-863a-4181-ae0c-7ff4931a863e.png)

## Biggest problems

- **version on node_modules** - Even with having the folder name in the .env file, somehow it was beeing tracked by git. It seems that the deployed version was loading the packages from this file. When there were too many modules it created a problem.

- **missing code in session config** - We weren't able to create sessions in the deployed version so the user was automatically kicked from all the protected routes. In the end it was caused by a accidentally deleted line of code in the session configuration file.

- **readable code** - Because we did the MVP first and then added features one by one as they were tested, the code on some places (mainly routes) is not as easy to read as we would like.

## Backlog

- Function to update the picture in the task.
- Function to update the shared field in the task.
- Possibility to share a task with more than one user.
- Make search function not case sensitive.

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

### GitHub

[Repository Link](https://github.com/dbravojuanico/ToDo_M2project)

### Adaptable

[Deploy Link](https://todo-m2project.adaptable.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1pBX9awTZxpPx5oD6Qgo6nJE_N8Y_EvrXTCT2RIYy1LE/edit?usp=sharing)
