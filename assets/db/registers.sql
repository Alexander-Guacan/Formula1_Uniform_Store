-- Roles
INSERT INTO userroles (`NAME`) VALUES ('admin');
INSERT INTO userroles (`NAME`) VALUES ('ventas');
INSERT INTO userroles (`NAME`) VALUES ('bodega');

-- Users
INSERT into users (`IDCARD`, `IDROL`, `FIRSTNAME`, `LASTNAME`, `MOBILENUMBER`, `EMAIL`, `USERNAME`, `PASSWORD`)
VALUES ('1752937712', 1, 'Alexander', 'Guacán', '0985635691', 'adguacan@espe.edu.ec', 'admin', '$2a$12$k3O7ZJrcef7oxH1IdaOC.u6Ji3hK1L7YBqNRcxLml.A/ZVkCEkRZmoux36WiZI/fIp8kzFNkRrW'); --rootroot
INSERT into users (`IDCARD`, `IDROL`, `FIRSTNAME`, `LASTNAME`, `MOBILENUMBER`, `EMAIL`, `USERNAME`, `PASSWORD`)
VALUES ('1711270155', 2, 'Carolina', 'Trejo', '0986237105', 'carol.trejo@gmail.com', 'carol123', '$2a$12$J0Fl4ft/tob1S0yK0OzF2.u37jUiyNqZ5AmTc0vb2f1WBwVq.TE7C'); --caro780
INSERT into users (`IDCARD`, `IDROL`, `FIRSTNAME`, `LASTNAME`, `MOBILENUMBER`, `EMAIL`, `USERNAME`, `PASSWORD`)
VALUES ('1717774788', 3, 'Edgar', 'Fernandez', '0972439839', 'edgar.fernandez@gmail.com', 'edfernan', '$2a$12$nPo6/xaSMKKqSaECk6D.Guxk8tvz2SIaIk/sCErT06eocEvpZhqT.'); --edfernan