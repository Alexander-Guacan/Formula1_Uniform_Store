-- Active: 1692396226116@@localhost@3306@formula1_store
/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     18/08/2023 20:11:36                          */
/*==============================================================*/


drop table if exists USERS;

drop table if exists USER_OPERATIONS;

drop table if exists USER_ROLES;

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   ID_USER              bigint not null auto_increment,
   ID_ROL               smallint not null,
   NAME                 char(30) not null,
   EMAIL                char(35) not null,
   PASSWORD             char(16) not null,
   primary key (ID_USER)
);

/*==============================================================*/
/* Table: USER_OPERATIONS                                       */
/*==============================================================*/
create table USER_OPERATIONS
(
   ID_OPERATION         bigint not null auto_increment,
   ID_USER              bigint not null,
   DESCRIPTION          char(150) not null,
   DATE                 date not null,
   TIME                 time not null,
   primary key (ID_OPERATION)
);

/*==============================================================*/
/* Table: USER_ROLES                                            */
/*==============================================================*/
create table USER_ROLES
(
   ID_ROL               smallint not null auto_increment,
   NAME                 char(30) not null,
   primary key (ID_ROL)
);

alter table USERS add constraint FK_PERTENECER foreign key (ID_ROL)
      references USER_ROLES (ID_ROL) on delete restrict on update restrict;

alter table USER_OPERATIONS add constraint FK_REALIZAR foreign key (ID_USER)
      references USERS (ID_USER) on delete restrict on update restrict;

