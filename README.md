# Sample_docker-compose_project
#### A sample project using docker-compose with mysql, node, and react.js containers.
#### This project is meant to give you an understanding of how to formulate your docker development environment for developing web apps using node.js and mysql.

- Express Server

- React.JS Client

- MySQL Database

# SETUP

To run all you need to do is run `docker-compose up` to have the compose file automatically spin everything up for you.
If you want to run a terminal in detached mode (so you can close the window and it wont stop the containers) then type `docker-compose up -d` for a headless start instead.

As always make sure to type `docker-compose down` to shut the containers down and close everything up.

Tutorial video coming soon!

Hope this helps!


# Backend
Run populateDatabase.sql to create the necessary tables.
## Endpoints


### Companies
#### Get all companies
Format: http://localhost:8080/api/companies/get
#### Get shipping companies
Format: http://localhost:8080/api/companies/get/shipping
#### Get client companies
Format: http://localhost:8080/api/companies/get/client
#### Add a company
Format: http://localhost:8080/api/companies/post?name=SOME_NAME&companyType=SOME_COMPANY_TYPE

Example: http://localhost:8080/api/companies/post?name=Viento Shipping&companyType=1
#### Delete a company
Format: http://localhost:8080/api/companies/SOME_ID/delete

Example: http://localhost:8080/api/companies/17/delete


### Ships
#### Get all ships
Format: http://localhost:8080/api/ships/get
#### Add a ship
Format: http://localhost:8080/api/ship/post?name=SOME_NAME&id=SOME_ID&companyid=SOME_COMPANY_ID

Example: http://localhost:8080/api/shipCompanies/post?name=Titanic II&id=1&companyid=2
#### Delete a ship
Format: http://localhost:8080/api/ship/SOME_ID/delete

Example: http://localhost:8080/api/shipCompanies/5/delete


###Account Types
Current Account Types: Captain, Freight Manager, Client

You shouldn't have to post or delete account types, but the functionality exists.
#### Get Account Types
Format: http://localhost:8080/api/accountTypes/get
#### Add an account type
Format: http://localhost:8080/api/ships/post/?type=SOME_ACCOUNT_TYPE&description=SOME_DESC

Example: http://localhost:8080/api/ships/post/?type=Captain&description=Users who are captains of ships
#### Delete an account type
Format: http://localhost:8080/api/accountType/SOME_ID/delete

Example: http://localhost:8080/api/accountType/SOME_ID/delete


###Users
#### Get Users
Format: http://localhost:8080/api/users/get
#### Add a user
Format: http://localhost:8080/api/users/post/?username=SOME_USERNAME&email=SOME_EMAIL&password=SOME_PASSWORD&type=SOME_ACCOUNT_TYPE&companyid=SOME_COMPANY_ID

Example: http://localhost:8080/api/users/post/?username=sparrow&email=jsparrow@viento.com&password=BlackPearl&type=1&companyid=1
#### Delete a user
Format: http://localhost:8080/api/users/SOME_ID/delete

Example: http://localhost:8080/api/users/SOME_ID/delete


###Crew
#### Get All Crew
Format: http://localhost:8080/api/crew/get
#### Get the crew of a specific ship (by id)
Format: localhost:8000/api/crew/get/SOME_ID

Example: localhost:8000/api/crew/get/1
#### Get the crew of a specific ship (by name)
Format: localhost:8000/api/crew/get/SOME_NAME

Example: localhost:8000/api/crew/get/SS Appleton
#### Add a crew member
Format: http://localhost:8080/api/crew/post/?name=SOME_NAME&shipID=SOME_SHIP_ID&position=SOME_POSITION&dateBoarded=SOME DATE

Date Format: YYYY-MM-DD

Example: http://localhost:8000/api/crew/post?name=John Bakersfield&shipID=1&position=First Mate&dateBoarded=2020-09-01
#### Delete a crew member
Format: http://localhost:8080/api/crew/SOME_ID/delete

Example: hhtp://localhost:8000/api/crew/2/delete
