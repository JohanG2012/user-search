

- Add local-settings instructions
- add docs instructions

Setup Database:
* run `docker-compose up`
* cd into the backend/data folder
* run `mongoimport --jsonArray --db usersearchdb --collection users --file data.json`
* Add a `permission` field to collection `db.getCollection('users').update(
  {},
  { $set: {"permission": false} },
  false,
  true
)`