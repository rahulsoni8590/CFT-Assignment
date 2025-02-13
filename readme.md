# How to start the project 
- Please create a '.evn' file.
- And setup the env variables in the .env file. 
    - SECRETKEY = any
    - DB_HOST = mongodb host url
    - DB_NAME = database/collection name
    
- Go to the project directory.
- And run command "node server.js" in the terminal.

# API Documentation

## Login or Authentication:
- Currently, I have hardcoded the user and email.
- On verifying the user and email it will generate a token which now can be set into the header as bearer Authorization.
- On each request on category and service api, token will be verified.

1. [POST]-Method = login.
    - api = "http://localhost:5500/login"
    - request-body = 
        {
            email: "admin@codesfortomorrow.com",
            password: "Admin123!@#"
        }
    - response =
        {    
            login:"Success",
            token: token
        }

## Category API

** For all request please set the bearer authorization token generation in the response upon login

1. [POST]-Method = Add the new category.
    - api = "http://localhost:5500/category"
    - request-body = 
        {
        name:string
        }
    - response = onSuccess 
        {
         "operation":"success",
        category:newCategory   
        }

2. [GET]-Method = TO get all the category.
    - api = "http://localhost:5500/categories"
    - response = onSuccess 
        {
         array of all categories  
        }
    
3. [PUT]-Method = Update the existing category.
    - api = "http://localhost:5500/category/:categoryId"
    - query-parameter = {categoryid:objectID}
    - request-body = 
        {
        name:string
        }
    - response = onSuccess 
        {
         "operation":"success",
        category:UpdatedCategory   
        }

4. [DELETE]-Method = Delete a category.
    - api = "http://localhost:5500/category/:categoryId"
    - query-parameter = {categoryid:objectID}
    - response = onSuccess 
        {
         "operation":"success",
        }


## Service API

** For all request please set the bearer authorization token generation in the response upon login

1. [POST]-Method = Add the new service.
    - api = "http://localhost:5500/category/:categoryId/service"
    - query-parameter = {categoryid:objectID}
    - request-body = 
        {
            name:string,
            type:"Normal" OR "VIP" default is "Normal" //optional
        }
    - response = onSuccess 
        {
            operation:"Success",
            service:newService
        }

2. [GET]-Method = TO get all the service with the associated categoryid.
    - api = "http://localhost:5500/category/:categoryId/services"
    - query-parameter = {categoryid:objectID}
    - response = onSuccess 
        {
            operation:"Success",
            allservice:allService
        }
    
3. [PUT]-Method = Update the a service with the associated category.
    - api = "http://localhost:5500/category/:categoryId/service/:serviceId"
    - query-parameter = {categoryid:objectID, serviceId:objectID}
    - request-body = 
        {
            name:string,
            type:"Normal" OR "VIP" default is "Normal" //optional
        }
    - response = onSuccess 
        {
            operation:"Success",
            service:updateService
        }

4. [DELETE]-Method = Delete the a service with the associated category.
    - api = "http://localhost:5500/category/:categoryId/service/:serviceId"
    - query-parameter = {categoryid:objectID, serviceId:objectID}
    - response = onSuccess 
        {
            operation:"Success",
        }