

## Requirements

* Docker
* Docker Compose
* Azure functions core tools
* .Net Core SDK


## Setup Database

* run `docker-compose up`
* cd into the backend/data folder
* run `mongoimport --jsonArray --db usersearchdb --collection users --file data.json`
* Add a `permission` field to collection `db.getCollection('users').update({},{ $set: {"permission": false},false,true)`

## Setup Backend

* cd into backend folder
* run `npm install`
* start backend `npm start`

## Setup Frontend
* cd into front folder
* run `npm install`
* start front `npm start`

## Api Documentation

* cd into backend folder
* run `npm run serve:apidoc`

## File Structure

```
project
│   README.md
│       
│
└───backend - Containers functions
│   │
│   │
│   └───shared - Contains code shared between functions
│ 
│   
└───front
    └───src
        │
        └───configs
        │
        └───constanst - Application wide constants
        │
        └───state - Redux store & states
        │
        └───views/commons - General components with high reusability
        │
        └───views/components - Components for specific use cases
        │
        └───views/containers - Redux containers
        │
        └───views/pages - Application pages, can be hooked to a router
    
```

## Application browser tested on

- [x] Internet Explorer 11 on Windows 10
- [x] Edge 18 on Windows 10
- [x] Chrome 73 on Windows 10
- [x] FireFox 66 on Windows 10
- [x] Safari on MacOS Mojave