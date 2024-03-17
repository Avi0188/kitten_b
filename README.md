# Project Name
# kitten_b

## Description

This project is aimed at providing APIs for managing users, games, and cards.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.

## Endpoints

### User Management

1. **Register User**
   - **Method:** POST
   - **Endpoint:** /user/register
   - **Description:** Registers a new user with provided email, name, and password.
   - **Request Body:**
     - email: Email address of the user
     - name: Name of the user
     - password: Password of the user
   - **Response:** Returns a message upon successful registration.

2. **Login User**
   - **Method:** POST
   - **Endpoint:** /user/login
   - **Description:** Logs in a user with provided email and password.
   - **Request Body:**
     - email: Email address of the user
     - password: Password of the user
   - **Response:** Returns a JWT token upon successful login.

### Game Management

1. **Create a New Game**
   - **Method:** POST
   - **Endpoint:** /game/games
   - **Description:** Creates a new game with a deck of cards for the authenticated user.
   - **Authentication:** Requires a valid JWT token in the request header.
   - **Response:** Returns the newly created game.

2. **Get All Games**
   - **Method:** GET
   - **Endpoint:** /game/games
   - **Description:** Retrieves all games for the authenticated user.
   - **Authentication:** Requires a valid JWT token in the request header.
   - **Response:** Returns an array of games.

3. **Get Game by ID**
   - **Method:** GET
   - **Endpoint:** /game/games/:id
   - **Description:** Retrieves a game by its ID.
   - **Authentication:** Requires a valid JWT token in the request header.
   - **Response:** Returns the requested game.

### Card Management

1. **Create a new card**
   - **Method:** POST
   - **Endpoint:** /card/cards
   - **Description:** Creates a new card with provided type and description.
   - **Request Body:**
     - type: Type of the card
     - description: Description of the card
   - **Response:** Returns the newly created card.

2. **Get All Cards**
   - **Method:** GET
   - **Endpoint:** /card/cards
   - **Description:** Retrieves all cards.
   - **Response:** Returns an array of cards.

3. **Get Card by ID**
   - **Method:** GET
   - **Endpoint:** /card/cards/:id
   - **Description:** Retrieves a card by its ID.
   - **Response:** Returns the requested card.

### Additional Information

- The project is hosted at [https://kitten-b.onrender.com](https://kitten-b.onrender.com).

