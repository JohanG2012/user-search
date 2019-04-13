

- Add local-settings instructions

Setup Database:
* run `docker-compose up`
* cd into the backend/data folder
* run `mongoimport --jsonArray --db usersearchdb --collection users --file data.json`