-- Active: 1692396226116@@localhost@3306@formula1_store
-- Roles
INSERT INTO userroles (`NAME`) VALUES ('admin');
INSERT INTO userroles (`NAME`) VALUES ('ventas');
INSERT INTO userroles (`NAME`) VALUES ('bodega');

-- Users
INSERT into users (`IDCARD`, `IDROL`, `FIRSTNAME`, `LASTNAME`, `MOBILENUMBER`, `EMAIL`, `USERNAME`, `PASSWORD`)
VALUES ('1752937712', 1, 'Alexander', 'Guacán', '0985635691', 'adguacan@espe.edu.ec', 'admin', '$2a$12$k3O7ZJrcef7oxH1IdaOC.u6Ji3hK1L7YBqNRcxLml.A/ZVkCEkRZm
oux36WiZI/fIp8kzFNkRrW');