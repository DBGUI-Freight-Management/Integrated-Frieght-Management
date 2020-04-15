
-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

GRANT ALL PRIVILEGES ON * TO 'manager'@'%';

use db;

create table accountTypes(
    typeID integer NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(50),
    PRIMARY KEY(typeID)
);

insert into accountTypes (name, description) values('Captain', 'Users who are captains of ships');
insert into accountTypes (name, description) values('Freight Manager', 'Users who are managers of shipping companies.');
insert into accountTypes (name, description) values('Client', 'Users checking on their freight shipments.');

create table users(
   userID integer NOT NULL AUTO_INCREMENT,
   password VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    phone integer,
   accountType int,
   PRIMARY KEY(userID),
   FOREIGN KEY(accountType) REFERENCES accountTypes(typeID)
);

insert into users(password, username, email, firstName, lastName, phone, accountType) values ('BlackPearl', 'sparrow', 'jsparrow@viento.com', 'Jack', 'Sparrow', 5555555, 1);
insert into users(password, username, email, firstName, lastName, phone, accountType) values ('likelikecpt', 'CptMorgan', 'hmorgan@gmail.com', 'Henry', 'Morgan', 9543302, 2);
insert into users(password, username, email, firstName, lastName, phone, accountType) values ('boringPa55word', 'smithy11', 'jsmith@viento.com', 'John', 'Smith', 1247548, 1);
insert into users(password, username, email, firstName, lastName, phone, accountType) values ('saturnV', 'rarmstrong', 'rarmstrong@retrograde.co.uk', 'Ryan', 'Armstrong', 5749837, 1);

create table companies (
   companyID integer NOT NULL auto_increment,
    companyName varchar(50),
    freightManagerID int,
    PRIMARY KEY(companyID),
    FOREIGN KEY(freightManagerID) REFERENCES users(userID)
);

insert into companies (companyName, freightManagerID) values('Viento Shipping', 3);
insert into companies (companyName, freightManagerID) values('Ellison Internattional', 3);
insert into companies (companyName, freightManagerID) values('Weiss Incoporated', 3);
insert into companies (companyName, freightManagerID) values('Ellison Internattional', 3);
insert into companies (companyName, freightManagerID) values('Denizen Farms', 3);
insert into companies (companyName, freightManagerID) values('Retrograde Aeronautics', 3);


create table ships(
    captainID integer,
   shipID integer NOT NULL AUTO_INCREMENT,
    companyID integer,
   shipName VARCHAR(50),
   PRIMARY KEY(shipID),
   FOREIGN KEY(companyID) REFERENCES companies(companyID)
);

insert into ships(captainID, shipName, companyID) values(1, 'SS Perugia', 1);
insert into ships(captainID, shipName, companyID) values(2, 'SS Appleton', 2);

select * from accountTypes;

create table crew(
   crewID integer NOT NULL auto_increment,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    shipID integer,
    position VARCHAR(50),
    dateBoarded DATE,
    PRIMARY KEY(crewID),
    FOREIGN KEY(shipID) REFERENCES ships(shipID)
);

insert into crew(firstName, lastName, shipID, position, dateBoarded) values ('Joe', 'Baker',2, 'First Mate', '2020-01-12');
insert into crew(firstName, lastName, shipID, position, dateBoarded) values ('Angelo', 'Voiello', 1, 'First Mate', '2016-10-16');
insert into crew(firstName, lastName, shipID, position, dateBoarded) values ('James', 'Harrison', 1, 'Mechanic', '2019-10-16');
select * from users;



