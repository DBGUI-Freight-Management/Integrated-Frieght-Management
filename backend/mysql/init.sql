
-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

GRANT ALL PRIVILEGES TO 'manager'@'%';

create table companyTypes (
	id integer NOT NULL auto_increment,
    type varchar(50),
    description varchar(50),
    PRIMARY KEY(id)
);

insert into companyTypes (type, description) values ('Shipping', 'The companies that operate the ships.');
insert into companyTypes (type, description) values ('Client', 'The companies that provide cargo.');

create table companies (
	id integer NOT NULL auto_increment,
    name varchar(50),
    companyType int,
    PRIMARY KEY(id),
    FOREIGN KEY(companyType) REFERENCES companyTypes(id)
);

insert into companies (name, companyType) values('Viento Shipping', 1);
insert into companies (name, companyType) values('Ellison Internattional', 1);
insert into companies (name, companyType) values('Weiss Incoporated', 1);
insert into companies (name, companyType) values('Ellison Internattional', 1);
insert into companies (name, companyType) values('Denizen Farms', 2);
insert into companies (name, companyType) values('Retrograde Aeronautics', 2);


create table ships(
	id integer NOT NULL AUTO_INCREMENT,
	name VARCHAR(50),
	companyID integer,
	PRIMARY KEY(id),
	FOREIGN KEY(companyID) REFERENCES companies(id)
);

create table accountTypes(
	id integer NOT NULL AUTO_INCREMENT,
    type VARCHAR(50),
    description VARCHAR(50),
    PRIMARY KEY(id)
);

insert into accountTypes (type, description) values('Captain', 'Users who are captains of ships');
insert into accountTypes (type, description) values('Freight Manager', 'Users who are managers of shipping companies.');
insert into accountTypes (type, description) values('Client', 'Users checking on their freight shipments.');

select * from accountTypes;

create table users(
	id integer NOT NULL AUTO_INCREMENT,
	username VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(50),
	accountType int,
    companyID int,
	PRIMARY KEY(id),
	FOREIGN KEY(accountType) REFERENCES accountTypes(id),
    FOREIGN KEY(companyID) REFERENCES companies(id)
);

insert into users(username, email, password, accountType, companyID) values ('sparrow', 'jsparrow@viento.com','BlackPearl', 1, 1);
insert into users(username, email, password, accountType, companyID) values ('CptMorgan', 'hmorgan@gmail.com','likelikecpt', 1, 2);
insert into users(username, email, password, accountType, companyID) values ('smithy11', 'jsmith@viento.com','boringPa55word', 2, 1);
insert into users(username, email, password, accountType, companyID) values ('rarmstrong', 'rarmstrong@retrograde.co.uk','saturnV', 3, 6);
select * from users;



