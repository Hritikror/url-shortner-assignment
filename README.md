
## Installation

```bash
$ npm install or npm install --force

.env file for DB configuration (Postgres)

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

* Jwt authentication and authorization implemented using Passport-jwt strategy
* Use middleware to authenticate
* Cron Job (scheduler) implemented which check every 5th second expirationTime become less than currentTime(Soft delete Url)
* input validation and sanitization implemented for security concern using class-validator package and Pipes
* Analytics singly handled in Json column (URL entity)
* Redis skipped due to low system configuration of personal laptop(RAM limit)



API to test given below:-

create user
![alt text](image.png)


login 
![alt text](image-1.png)


use jwt token in headers (Authorization = Bearer 'token')
![alt text](image-2.png)
![alt text](image-3.png)


use shortUrl
![alt text](image-4.png)
![alt text](image-5.png)


analytics
![alt text](image-6.png)

more info -> contact -> hritikror@gmail.com