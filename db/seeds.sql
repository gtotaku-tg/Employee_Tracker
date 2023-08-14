INSERT INTO department(name) 
VALUES  ('Research'),
        ('Customer Support'),
        ('Production'),
        ('Marketing'),
        ('Finance'),
        ('HR'),
        ('IT'),
        ('Operations'),
        ('Design'),
        ('Sales');

    SELECT * FROM department;
    


INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 5),
    ('Software Engineer', 120000, 5),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Lead Designer', 160000, 10),
    ('Designer', 130000, 10),
    ('Lead Researcher', 150000, 7),
    ('Researcher', 120000, 7),
    ('Lead Customer Support Agent', 125000, 8),
    ('Customer Support Agent', 100000, 8),
    ('Lead Production Manager', 150000, 9);

    SELECT * FROM role;


   
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Mike', 'Chan', 2, 1),
        ('Ashley', 'Rodriguez', 3, NULL),
        ('Kevin', 'Tupik', 4, 3),
        ('Malia', 'Brown', 5, NULL),
        ('Sarah', 'Lourd', 6, 5),
        ('Tom', 'Allen', 7, NULL),
        ('Sam', 'Clemens', 8, 7),
        ('Chuck', 'Norris', 9, NULL),
        ('Bruce', 'Lee', 10, 9),
        ('Jackie', 'Chan', 11, NULL),
        ('Jet', 'Li', 12, 12),
        ('Jason', 'Statham', 13, NULL),
        ('Vin', 'Diesel', 14, 7),
        ('Dwayne', 'Johnson', 14, NULL);

        SELECT * FROM employee;
 
