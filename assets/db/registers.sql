-- Roles
INSERT INTO userroles (name) VALUES ('admin');
INSERT INTO userroles (name) VALUES ('ventas');
INSERT INTO userroles (name) VALUES ('bodega');

-- Users
INSERT into users (idCard, idRol, firstName, lastName, mobileNumber, email, username, password)
VALUES ('1752937712', 1, 'Alexander', 'Guacán', '0985635691', 'adguacan@espe.edu.ec', 'admin', '$2a$12$k3O7ZJrcef7oxH1IdaOC.u6Ji3hK1L7YBqNRcxLml.A/ZVkCEkRZmoux36WiZI/fIp8kzFNkRrW');
INSERT into users (idCard, idRol, firstName, lastName, mobileNumber, email, username, password)
VALUES ('1711270155', 2, 'Carolina', 'Trejo', '0986237105', 'carol.trejo@gmail.com', 'carol123', '$2a$12$y/wSQLp9vjNb6keQ8KDo4u.dvuP2LSZ5ALOE/GblvtfrqtOBGVyou');
INSERT into users (idCard, idRol, firstName, lastName, mobileNumber, email, username, password)
VALUES ('1717774788', 3, 'Edgar', 'Fernandez', '0972439839', 'edgar.fernandez@gmail.com', 'edfernan', '$2a$12$nPo6/xaSMKKqSaECk6D.Guxk8tvz2SIaIk/sCErT06eocEvpZhqT.');
INSERT INTO users(idCard, idRol, firstName, lastName, username, password, mobileNumber, email) VALUES('1799234123', 2, 'Alejandra', 'Palacios', 'alepalacios', '$2a$12$aELcWKPu6uKHZtXFcRZuy.Gg6AH8ELdMe6unu6rrirMrNns.ah00G', '0925474343', 'alepalacios@gmail.com');