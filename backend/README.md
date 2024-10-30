# 🚀 GovTool Delegation Pillar Backend 🚀

The `@intersect.mbo/govtool-delegation-pillar-backend` is a NestJS application that serves as the backend for the GovTool Voting Pillar. It provides the API endpoints for the frontend to interact with the db-sync.

## Table of content:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)

## Prerequisites

- Node.js installed - [Download link](https://nodejs.org/en/download/).
- PostgreSQL installed (if running locally without Docker) - [Download link](https://www.postgresql.org/).
- Docker and Docker Compose installed (for Docker environment) - [Download link](https://docs.docker.com/get-started/)

## Installation

```bash
$ npm install
```

## Running the app

To run the application locally, you need to have Node.js installed.
Copy `.env.example` to `.env` and fill in the required environment variables.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
