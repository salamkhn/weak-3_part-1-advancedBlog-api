# 🦅 BLOG API

//Blog Api built with express 'mongoose and jwt authentication

# 😍😎 FEATURES

//User registration and login
//Crud for blogsContent
//Crud for profile
//Middleware for error handling and validation

# 😃 INSTALLATION

//npm i

#RUN SERVER
//node server.js

//API ROUTES

(user)
POST/api/user/register
POST/api/user/login

(content)
=>post/api/content/insert
GET /api/content/showallblogscontent
GET /api/content/getbyid/:id
PUT /api/content/getbyidandupdate/:id
DELETE /api/blog/content/getbyidanddelete/:id

(profile)
POST /api/profile/insert
GET /api/profile/showallprofiles
GET /api/profile/getbyid/:id"
PUT /api/profile/getprofilebyidandupdate/:id
DELETE /api/blog/profile/getprofilebyidandupdate/:id

(category)
POST /api/category/insert
GET /api/category/showallcatogory
