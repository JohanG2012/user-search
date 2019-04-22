

- Add local-settings instructions
- add docs instructions
- browser tested on

Docker
Docker Compose
azure-functions-core-tools
.Net Core SDK


Setup Database:
* run `docker-compose up`
* cd into the backend/data folder
* run `mongoimport --jsonArray --db usersearchdb --collection users --file data.json`
* Add a `permission` field to collection `db.getCollection('users').update({},{ $set: {"permission": false},false,true)`

Setup Backend:
* cd into backend folder
* run `npm install`
* start backend `npm start`

Setup Frontend:
* cd into front folder
* run `npm install`
* start front `npm start`
