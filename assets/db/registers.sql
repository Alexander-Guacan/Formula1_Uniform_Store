/* Roles */
INSERT INTO userroles (name) VALUES
('super_admin'),
('admin'),
('recursos_humanos'),
('ventas'),
('bodega');

/* Measures */
INSERT INTO measures (name) VALUES
('pulgadas'),
('mm'),
('cm'),
('m'),
('mg'),
('g'),
('kg'),
('lb'),
('cajas'),
('unidades');

/* Sizes */
INSERT INTO sizes (name) VALUES
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');

/* Users */
INSERT INTO users (idCard, idRol, firstName, lastName, mobileNumber, email, username, password) VALUES
('1752937712', 2, 'Alexander', 'Guacán', '0985635691', 'adguacan@espe.edu.ec', 'admin', '$2a$12$k3O7ZJrcef7oxH1IdaOC.u6Ji3hK1L7YBqNRcxLml.A/ZVkCEkRZmoux36WiZI/fIp8kzFNkRrW');