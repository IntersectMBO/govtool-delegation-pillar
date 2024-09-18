# GovTool Delegation Pillar

This is the repository which holds GovTool's Delegation Pillar packages.

For further information and documentation see [GovTool](https://github.com/IntersectMBO/govtool).

## Table of content:

- [GovTool Delegation Pillar](#govtool-delegation-pillar)
  - [Table of content:](#table-of-content)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Tech stack:](#tech-stack)
- [Frontend](#frontend)
  - [Getting started](#getting-started)
  - [Running locally](#running-locally)
  - [Running using docker compose](#running-using-docker-compose)

## Introduction

This document serves as a comprehensive guide for setting up the full stack of our application, which includes the backend, frontend, and database components.

## Prerequisites

- Node.js installed - [Download link](https://nodejs.org/en/download/).
- PostgreSQL installed (if running locally without Docker) - [Download link](https://www.postgresql.org/).
- Docker and Docker Compose installed (for Docker environment) - [Download link](https://docs.docker.com/get-started/)

## Tech stack:

[React](https://react.dev/)

[Typescript](https://www.typescriptlang.org/)

# Frontend

The frontend of the application is built using React, a popular JavaScript library for building user interfaces.

## Getting started

Before you begin setting up the application, you'll need to clone the repository from GitHub to get a local copy of the code. Follow these steps to clone the repository and start setting up the application components:

1. **Clone the Repository:**

   - Open a terminal on your computer.
   - Navigate to the directory where you want to store the project.
   - Run the following command to clone the repository:
     ```
     git clone https://github.com/IntersectMBO/govtool-delegation-pillar.git
     ```

2. **Navigate to the Project Directory:**
   - After cloning, change into the project's root directory:
     ```
     cd govtool-delegation-pillar
     ```
     This directory contains all the files you need to set up the application.

By cloning the repository, you ensure that you have the latest version of the code and all the necessary files to get started with the application setup.

## Running locally

To run the application locally, you need to have Node.js installed.

1. **Install dependencies** by running `npm install`.
2. **Configure Environment Variables:** Create or edit a `.env` file in the frontend directory to include environment variables specific to application.
3. **Start the React Application** with `npm run dev` for development mode. This command serves your frontend application and hot-reloads for any changes.

## Running using docker compose

To run the application using Docker Compose, you need to have Docker and Docker Compose installed.

1. **Build the Docker Images:** Run `docker-compose build` to build the Docker images for the frontend and backend.
2. **Start the Application:** Run `docker-compose up` to start the application.
