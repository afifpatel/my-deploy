# Senior Full Stack Engineer Take-Home Challenge

![CI](https://github.com/umar-ahmed/treasured-senior-full-stack-challenge/workflows/CI/badge.svg)

## :star2: Getting Started

1. Clone repo
1. Run `yarn install` to install workspace dependencies
1. Run `yarn backend:setup` to create and seed database
1. Run `yarn start` to start up the frontend and backend development servers

## :ballot_box_with_check: To Do (~2 hours)

> **Disclaimer:** Times noted in this section are in "dev" time units. We don't expect you to complete the entire challenge in a single sitting if you don't want to, nor do we want to limit your creativity. However, in order to judge candidates fairly, we give a rough estimate of how much time we expect for it to take to complete each section. Best of luck! :smile:

### Coding (~90 mins)

- [ ] Add support for comment replies (ie. threaded comments). It's up to you how you want to present the replies and whether or not you want to support multiple levels of nesting. However, make sure that you take into account the usability of your comments system.
- [ ] Refactor `App` component to split it up into modular React components.
- [ ] Deploy the application (both frontend and backend) somewhere online at a public URL (we'll be using this to access your submission) and add the URL to the top of this README.

### Follow-up Questions (~30 mins)

After completeing the coding portion of the challenge, please answer the following questions by editing this README:

**What was the most difficult part of the coding challenge for you? What was the easiest?**

I was not familiar with a few tech i.e. prisma, sqlite and redux-saga. I would not say that was the difficult part but took most time. The easiest was development in react.

**If there’s one thing you could change about the starter code that was given to you, what would you change and why?**

Perhaps, a better orgainzation and documentation would help get started quick.

**If a product manager asked you to implement the replies feature for a real product, what questions would you ask them? Explain your rationale.**

I would ask: 
 - business relevant questions - what does a USER/CLIENT expect from this feature. The number of users to feature inorder to
   layout the schema accordingly.
 - design questions - what should the schema look like, how we need to couple the relationships etc. How we want the feature on UI?

**What considerations would you make if you were asked to modify this comment system to support 1000 comments? How about 1 million? (Be as specific as possible about what changes you would make to the backend, frontend, deployment, etc.)**

As the comment size increase the application needs to be scaled accordingly.
For 1000 comments - 
  Database require indexing and pagination. Front-end would be be required to set page-limit, per_page records and display paged results   accordingly, for a faster UI.
For million comments -
  I would use a NoSQL DB and use concepts like sharding and indexing.
  The comment service need to be a service by itself like micro-service.
  We need a load balancer.

## :file_folder: Project Structure

This project is setup using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) with the following workspaces:

- **frontend**
  - Contains a CRA-bootstrapped app that connects to the backend REST API
  - Uses `redux` and `redux-saga` to do state management and async
  - Uses `axios` for data fetching (see `services` folder)
- **backend**
  - Contains a simple Express server that serves two resources: `users` and `comments`
  - Data is stored in a SQLite database (schema is defined in the [`setup.js` script](./backend/setup.js)) and is manually seeded with data
  - Database is accessed using [Prisma](https://www.prisma.io/docs/) (but feel free to switch this out with simple SQL queries using the `sqlite3` library or anything else you prefer)

You will also find a pre-defined GitHub Actions workflow at `.github/workflows/build.yml` that builds the frontend React app on each push to the master branch. **Make sure that this workflow is still running successfully when you are done the challenge as we'll be looking at that as well.**

Also, take a look at the scripts in the [package.json](package.json), especially the `backend` ones, as they should make it easier when you are modifying the schema of the database.

## :ship: Docker Sample

In the **backend** folder you will find a dockerfile that provides a sample of you you can run the backend with docker.

You can run the backed in docker with the following commands

```
cd backend
docker build . -t challenge
docker run --detach --name challenge-container --publish 3001:3001 --restart always challenge
```
