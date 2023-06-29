### Prerequisite
```
node: 16.20.0
mongodb mongoose 7.3.1
```

### Project Setup
Once you clone or download project go into you folder

### Installing
```
> npm install or npm install  (this will install all dependent libraries)
```

### Env Config Setup
so in my **.env** file will set below parameters.
```
# DB SETTINGS
MONGO_URI=mongodb://127.0.0.1:27017/testdb?maxPoolSize=10
PORT=3000
```
### Add test department data mannually


>Everythig is setup and you are good to go test. :)

```
run `npm start`
```

## save empleyee API
need to pass unique `user-id` in header to apply rate limit per user

```
Set postman env global variable
HOST_API: http://localhost:3000
AUTH_TOKEN: genrated token
```

### Login
```
curl --location --request POST 'http://localhost:3000/employees' \
--header 'user-id: 2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test",
    "email": "testde@gmail.com",
    "departmentId": "649427fdfc7ca1efc7e1f52c"
}'

```


```
### Error Response
```
{
    "statusCode": 400,
    "message": "bad request"
}

{
    "statusCode": 429,
    "type": "error",
    "message": "Forbidden"
}

{
    "statusCode": 200,
    "data" : {}
}