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
      "host": "<db host>", //set our db host
      "database": "",      //set your db name
      "username": "",      // set username
      "password": "",      //set password
      "dialect": "postgres",
      "logging" : false
    },
    "server": {
      "port": "<port>",    //set application port
      "url": "http://<your host>" 
    },
    "bstoken": {
      "secret": "rxPhglGJWPlOW596" //you can change or not 
    }
  }
   ```