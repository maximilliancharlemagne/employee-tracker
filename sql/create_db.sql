DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department
(id int auto_increment,
primary key (id),
name varchar(30));

CREATE TABLE role
(id int auto_increment,
primary key (id),
title varchar(30),
salary decimal,
department_id int,
foreign key (department_id) references department (id));

CREATE TABLE employee
(id int auto_increment,
primary key (id),
first_name varchar(30),
last_name varchar(30),
role_id int,
foreign key (role_id) references role (id),
manager_id int,
foreign key (manager_id) references employee (id));