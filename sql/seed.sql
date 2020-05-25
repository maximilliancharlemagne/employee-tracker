
USE company_db;
INSERT INTO department(name)
VALUES ('Sales'),('Engineering'),('HR');

SELECT * FROM department;

USE company_db;
INSERT INTO role(title,salary,department_id)
VALUES('Account Executive',85000,1),('Sales Intern',40000,1),
('Senior Engineer',120000,2),('Junior Engineer',80000,2),
('VP of HR',200000,3),('Payroll Specialist',55000,3);

SELECT * FROM role;

--since this table is self-referential, we insert employees with no manager first
USE company_db;
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('John','Worthington',1,null),
('Taylor','Lopez',3,null),
('Stella','McDowell',5,null);

SELECT * FROM employee;

USE company_db;
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('Fabian','MacArthur',2,1),
('Courteney','Willis',4,2),
('Agatha','Barnard',6,3);

SELECT * FROM employee;