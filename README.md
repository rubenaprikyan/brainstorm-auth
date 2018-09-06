## Step 1 
 ````Clone this repo 
     $ git clone https://github.com/rubenaprikyan/brainstorm-auth.git
 ````
## Step 2 
````
    $ npm install
````
## Step 3
   Set Configurations 
   /config/development||production/main.json 
   ```json
   {
    "db": {
      "host": "<set our db host>", 
      "database": "<set your db name>",      //
      "username": "<set username>", 
      "password": "<set password>",
      "dialect": "postgres",
      "logging" : false
    },
    "server": {
      "port": "<port>",    //set application port
      "url": "http://<your host>" 
    },
    "bstoken": {
      "secret": "rxPhglGJWPlOW596"
    }
  }
   ```
## Step 4
  ````
  $ npm migrate-up
  $ npm seed-up  
  ````  
## Step 5
````
$ npm  start

send POST request http:// localhost:4000/v1/users/login where request body is   {
                                                                                    "email": "brainstorm-test-<number>@mailinator.com"
                                                                                    "password": "hunter"                             
                                                                                }
send GET request http://localhost:400/v1/users/me Where authorization bearer of the header is a previous action, a responsed token

````     
