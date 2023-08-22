/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     21/08/2023 23:36:16                          */
/*==============================================================*/


drop table if exists USEROPERATIONS;

drop table if exists USERROLES;

drop table if exists USERS;

/*==============================================================*/
/* Table: USEROPERATIONS                                        */
/*==============================================================*/
create table USEROPERATIONS
(
   IDOPERATION          bigint not null auto_increment,
   IDCARD               char(10) not null,
   DESCRIPTION          char(250) not null,
   DATE                 date not null,
   TIME                 time not null,
   primary key (IDOPERATION)
);

/*==============================================================*/
/* Table: USERROLES                                             */
/*==============================================================*/
create table USERROLES
(
   IDROL                smallint not null auto_increment,
   NAME                 char(30),
   primary key (IDROL)
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   IDCARD               char(10) not null,
   IDROL                smallint not null,
   FIRSTNAME            char(30) not null,
   LASTNAME             char(30) not null,
   MOBILENUMBER         char(10) not null,
   EMAIL                char(100) not null,
   USERNAME             char(20) not null,
   PASSWORD             char(60) not null,
   ISACTIVE             bool not null default true,
   primary key (IDCARD)
);

alter table USEROPERATIONS add constraint FK_REALIZAR foreign key (IDCARD)
      references USERS (IDCARD) on delete restrict on update restrict;

alter table USERS add constraint FK_PERTENECER foreign key (IDROL)
      references USERROLES (IDROL) on delete restrict on update restrict;

