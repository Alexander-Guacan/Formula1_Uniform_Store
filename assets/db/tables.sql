/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     26/08/2023 14:42:39                          */
/*==============================================================*/


drop table if exists InitialInventory;

drop table if exists Items;

drop table if exists Measure;

drop table if exists PurchaseOrder;

drop table if exists PurchaseOrderDetails;

drop table if exists UserOperations;

drop table if exists UserRoles;

drop table if exists Users;

/*==============================================================*/
/* Table: InitialInventory                                      */
/*==============================================================*/
create table InitialInventory
(
   idInitialInventory   smallint not null auto_increment,
   price                decimal(2,2) not null,
   stock                smallint not null,
   primary key (idInitialInventory)
);

/*==============================================================*/
/* Table: Items                                                 */
/*==============================================================*/
create table Items
(
   idItem               bigint not null auto_increment,
   idInitialInventory   smallint not null,
   idMeasure            smallint not null,
   name                 char(30) not null,
   price                decimal(2,2) not null,
   stock                smallint not null,
   primary key (idItem)
);

/*==============================================================*/
/* Table: Measure                                               */
/*==============================================================*/
create table Measure
(
   idMeasure            smallint not null auto_increment,
   name                 char(30) not null,
   primary key (idMeasure)
);

/*==============================================================*/
/* Table: PurchaseOrder                                         */
/*==============================================================*/
create table PurchaseOrder
(
   idPurchaseOrder      bigint not null auto_increment,
   idCard               char(10) not null,
   totalPrice           decimal(4,2),
   primary key (idPurchaseOrder)
);

/*==============================================================*/
/* Table: PurchaseOrderDetails                                  */
/*==============================================================*/
create table PurchaseOrderDetails
(
   idPurchaseOrderDetails bigint not null,
   idPurchaseOrder      bigint not null,
   idItem               bigint not null,
   primary key (idPurchaseOrderDetails)
);

/*==============================================================*/
/* Table: UserOperations                                        */
/*==============================================================*/
create table UserOperations
(
   idOperation          bigint not null auto_increment,
   idCard               char(10) not null,
   description          char(250) not null,
   date                 timestamp not null,
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

alter table Items add constraint FK_iniciar foreign key (idInitialInventory)
      references InitialInventory (idInitialInventory) on delete restrict on update restrict;

alter table Items add constraint FK_medir foreign key (idMeasure)
      references Measure (idMeasure) on delete restrict on update restrict;

alter table PurchaseOrder add constraint FK_hacer foreign key (idCard)
      references Users (idCard) on delete restrict on update restrict;

alter table PurchaseOrderDetails add constraint FK_estar foreign key (idPurchaseOrder)
      references PurchaseOrder (idPurchaseOrder) on delete restrict on update restrict;

alter table PurchaseOrderDetails add constraint FK_estar2 foreign key (idItem)
      references Items (idItem) on delete restrict on update restrict;

alter table UserOperations add constraint FK_realizar foreign key (idCard)
      references Users (idCard) on delete restrict on update restrict;

alter table Users add constraint FK_pertenecer foreign key (idRol)
      references UserRoles (idRol) on delete restrict on update restrict;

