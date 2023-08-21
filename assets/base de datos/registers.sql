-- Active: 1692396226116@@localhost@3306@formula1_store
-- Roles
INSERT INTO userroles (`NAME`) VALUES ('admin');
INSERT INTO userroles (`NAME`) VALUES ('ventas');
INSERT INTO userroles (`NAME`) VALUES ('bodega');

-- Users
INSERT INTO users (`IDCARD`, `NAME`, `EMAIL`, `PASSWORD`, `MOBILENUMBER`, `IDROL`)
VALUES ('1752937712', 'John Doe', 'johndoe@gmail.com', 'rootroot', '0985635691', 1);
INSERT INTO users (`IDCARD`, `NAME`, `EMAIL`, `PASSWORD`, `MOBILENUMBER`, `IDROL`)
VALUES ('1711270155', 'Juan Pérez', 'juanperez@hotmail.com', 'adminadmin', '0986237105', 1);
INSERT INTO users (`IDCARD`, `NAME`, `EMAIL`, `PASSWORD`, `MOBILENUMBER`, `IDROL`)
VALUES ('1717274788', 'Jane Doe', 'janedoe@yahoo.com', 'password123', '0993968735', 2);
INSERT INTO users (`IDCARD`, `NAME`, `EMAIL`, `PASSWORD`, `MOBILENUMBER`, `IDROL`)
VALUES ('1713627071', 'María Gonzáles', 'janedoe@yahoo.com', 'password123', '0993968735', 3);