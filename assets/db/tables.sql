/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     24/08/2023 17:54:26                          */
/*==============================================================*/


drop table if exists UserOperations;

drop table if exists UserRoles;

drop table if exists Users;

/*==============================================================*/
/* Table: UserOperations                                        */
/*==============================================================*/
create table UserOperations
(
   idOperation          bigint not null auto_increment,
   idCard               char(10) not null,
   description          char(250) not null,
   date                 date not null,
   time                 time not null,
   primary key (idOperation)
);

/*==============================================================*/
/* Table: UserRoles                                             */
/*==============================================================*/
create table UserRoles
(
   idRol                smallint not null auto_increment,
   name                 char(30),
   primary key (idRol)
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users
(
   idCard               char(10) not null,
   idRol                smallint not null,
   firstName            char(30) not null,
   lastName             char(30) not null,
   username             char(20) not null,
   password             char(60) not null,
   mobileNumber         char(10) not null,
   email                char(100) not null,
   isActive             bool not null default true,
   primary key (idCard)
);

alter table UserOperations add constraint FK_realizar foreign key (idCard)
      references Users (idCard) on delete restrict on update restrict;

alter table Users add constraint FK_pertenecer foreign key (idRol)
      references UserRoles (idRol) on delete restrict on update restrict;

