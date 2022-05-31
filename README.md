## Google Books project - backend

This webapp allows people to curate their own personal libraries and review books

Link to webapp:
[https://googlebooks-frontend-k.herokuapp.com/home](https://googlebooks-frontend-k.herokuapp.com/home)

## Features

1. Search for books using the Google books API
2. Add books that you own to your libraru
3. Review books

## Technical Details

1. MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS)
2. Schema:
   i. Users Model with authentication
   ii. Library Model
   iii. Review Model
3. Includes all major CRUD functions
   i. Users can create an account and login
   ii. Users can save and delete books to their libraries
   iii. Users can create, edit and delete their book reviews

## Other framewotk / tools used:

- [Bootstrap](https://getbootstrap.com/)
- [Dayjs](https://day.js.org/)
- [Jotai](https://jotai.org/) was used to pass the _login_ state to all the components in the frontend

## Possible future development areas:

- Allow user to rate books
- Allow books to be filtered by ratings

## Installation instructions:

1. `git clone` the [frontend](https://github.com/klaucoffee/googlebooks-frontend) and the [backend](https://github.com/klaucoffee/googlebooks-backend)
2. `npm install`

## The project is hosted on Github

Frontend: [https://github.com/klaucoffee/googlebooks-frontend](https://github.com/klaucoffee/googlebooks-frontend)

Backend: [https://github.com/klaucoffee/googlebooks-backend](https://github.com/klaucoffee/googlebooks-backend)

## This app is deployed on:

Frontend:[https://googlebooks-frontend-k.herokuapp.com/home](https://googlebooks-frontend-k.herokuapp.com/home)

Backend: [https://googlebooks-backend-k.herokuapp.com/home](https://googlebooks-backend-k.herokuapp.com/home)
