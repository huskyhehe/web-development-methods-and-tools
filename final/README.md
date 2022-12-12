# Campus Yammer
This project aims to implement a campus yammer for campus students and staffs to create, update posts and add, delete comments. 
- **Views**: login, post feed, post details, user profiles
- **Roles**: user, admin


**Table of Contents**:  
- [1 Built with](#1-built-with)  
- [2 Getting Started](#2-getting-started)
- [3 APIs](#3-apis)
- [4 Form Validations](#4-form-validations)

<br>

## 1 Built with
- **Express.js**: an express server.js to host RESTFUL services and act as a static file server
- **React**: a create-react-app-based SPA build as static files that consume those services

<br>

## 2 Getting Started
### 2.1 Setup

- Run `npm install`

### 2.2 Running for development

- **Start the express server**: 
    - in a terminal, 
        - for windows users, run `npm run start-win` 
        - for other users, run `npm run start`
- **Start the development CRA server**: 
    - in a DIFFERENT terminal, run `npm run dev` 
- Visit localhost on port **3000**:
    -  http://localhost:3000, the development server port

### 2.3 Running for production
- **Create the static files**: 
    -  in a terminal, run `npm run build` to create the static files in the `build/` directory
- **start the express server**: 
    -  in a terminal,
        - For windows users, run run `npm run start-win`
        - For other users, run `npm run start`
- Visit localhost on port **4000**:
    - http://localhost:4000, the express server port

<br>

## 3 APIs
### 3.1 sessions
| Method | URL | User access | Admin access |
|----|---|---|---|
| `GET` | `/api/v1/session` | √ | √ |
| `POST` | `/api/v1/session` | √ | √ |
| `DELETE` | `/api/v1/session` | √ | √ |
### 3.2 posts
| Method | URL | Description | User access | Admin access |
|----|---|---|---|---|
| `GET` | `/api/v1/posts` | Get all posts |  √ | √ |
| `POST` | `/api/v1/posts` | Add a new post (user only) | √ | |
| `GET` | `/api/v1/posts/{id}` | Get a post by id | √ | √ |
| `PATCH` | `/api/v1/posts/{id}` | Update a post's featured status (admin only) |  | √ |
### 3.3 comments
| Method | URL | Description | User access | Admin access |
|----|---|---|---|---|
| `POST` | `/api/v1/posts/{postId}/comments` | Add a new comment to a post (user only) | √ |  |
| `DELETE` | `/api/v1/posts/{postId}/comments/{commentId}` | Delete a comment (user only; user can delete a comment created by themselves) | √ |  |
### 3.4 users
| Method | URL | Description | User access | Admin access |
|----|---|---|---|---|
| `GET` | `/api/v1/users/{username}` | Get a user's post | √ | √ |

<br>

## 4 Form Validations
| Form | Client-side | Server-side |
|----|---|---|
| LoginForm | - Disable submit button when blank | `required-username`<br>`required-username`
| AddPostForm <br> AddCommentForm | - Disabled submit button when blank <br> - Show text length indicators <br> - When the length exceeds limit: <br> -- the length counter will turn red <br> -- and the submit button will be disabled. | `required-text`<br>`required-content` <br> `limit-exceeded`