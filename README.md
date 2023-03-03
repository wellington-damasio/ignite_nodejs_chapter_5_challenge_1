# Ignite Node.js 2021 Challenge #5.1 - Integrated Testing

## Challenge
Create tests for the Controllers in this application (FinAPI).

## Tests
For each route, tests will be created based on the system requirements that can be analysed by checking the Controller of the route

#### POST /api/v1/users (Create user) ✅
- Should be able to create a new user
- Should not be able to create a new user with the same email as an already existent user

#### POST /api/v1/sessions (Authtenticate user) ✅
- Should be able to authenticate an user
- Should not be able to authenticate a non-existent user
- Should not be able to authenticate a user if the password passed is wrong

#### GET /api/v1/profile (Show profile) ✅
- Should be able to display user profile data
- Should not be able to return a non-existent user's profile data

#### GET /api/v1/statements/balance (Show user account balance) ✅
- Should be able to display the balance of an user
- Should not be able to display the balance of an user that is non-existent

#### POST /api/v1/statements/deposit (Create deposit statement) ✅
- Should be able to generate a new deposit statement in an user's account
- Should not be able to generare a new statement for a non-existent user

#### POST /api/v1/statements/withdraw (Create withdraw statement) ✅
- Should be able to generate a new withdraw statement in an user's account
- Should not be able to generare a new statement for a non-existent user
- Should not be able to generate a new withdraw statement in an users's account if that user doesn't have sufficient funds

#### GET /api/v1/statements/:statement_id (Show specific statement) ✅
- Should be able to display an user's statement
- Should not be able to display a non-existent statement
