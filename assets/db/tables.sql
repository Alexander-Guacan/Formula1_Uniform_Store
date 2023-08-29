/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     29/08/2023 15:45:33                          */
/*==============================================================*/


drop table if exists DatasheetsItems;

drop table if exists DatasheetsLabors;

drop table if exists InitialItems;

drop table if exists Items;

drop table if exists Labors;

drop table if exists Measures;

drop table if exists Products;

drop table if exists PurchaseOrders;

drop table if exists PurchaseOrdersDetails;

drop table if exists Sizes;

drop table if exists UserOperations;

drop table if exists UserRoles;

drop table if exists Users;

/*==============================================================*/
/* Table: DatasheetsItems                                       */
/*==============================================================*/
create table DatasheetsItems
(
   idDatasheetItem      bigint not null auto_increment,
   idProduct            bigint not null,
   idItem               bigint not null,
   itemQuantity         int not null,
   primary key (idDatasheetItem)
);

/*==============================================================*/
/* Table: DatasheetsLabors                                      */
/*==============================================================*/
create table DatasheetsLabors
(
   idDatasheetLabor     bigint not null auto_increment,
   idProduct            bigint not null,
   idLabor              bigint not null,
   workHours            real not null,
   primary key (idDatasheetLabor)
);

/*==============================================================*/
/* Table: InitialItems                                          */
/*==============================================================*/
create table InitialItems
(
   idInitialItem        bigint not null,
   idMeasure            smallint not null,
   name                 char(30) not null,
   price                float(3,2) not null,
   stock                smallint not null,
   primary key (idInitialItem)
);

/*==============================================================*/
/* Table: Items                                                 */
/*==============================================================*/
create table Items
(
   idItem               bigint not null auto_increment,
   idMeasure            smallint not null,
   name                 char(30) not null,
   price                float(3,2) not null,
   stock                smallint not null,
   isActive             bool not null default true,
   primary key (idItem)
);

/*==============================================================*/
/* Table: Labors                                                */
/*==============================================================*/
create table Labors
(
   idLabor              bigint not null auto_increment,
   description          char(250) not null,
   hourlyRate           float(3,2) not null,
   isActive             bool not null default true,
   primary key (idLabor)
);

/*==============================================================*/
/* Table: Measures                                              */
/*==============================================================*/
create table Measures
(
   idMeasure            smallint not null auto_increment,
   name                 char(30) not null,
   primary key (idMeasure)
);

/*==============================================================*/
/* Table: Products                                              */
/*==============================================================*/
create table Products
(
   idProduct            bigint not null auto_increment,
   idSize               smallint not null,
   name                 char(30) not null,
   isActive             bool not null default true,
   primary key (idProduct)
);

/*==============================================================*/
/* Table: PurchaseOrders                                        */
/*==============================================================*/
create table PurchaseOrders
(
   idPurchaseOrder      bigint not null auto_increment,
   idCard               char(10) not null,
   totalPrice           float(8,2) not null,
   date                 timestamp not null,
   primary key (idPurchaseOrder)
);

/*==============================================================*/
/* Table: PurchaseOrdersDetails                                 */
/*==============================================================*/
create table PurchaseOrdersDetails
(
   idPurchaseOrderDetail bigint not null auto_increment,
   idPurchaseOrder      bigint not null,
   idItem               bigint not null,
   itemPrice            float(3,2) not null,
   quantityItemPurchased int not null,
   primary key (idPurchaseOrderDetail)
);

/*==============================================================*/
/* Table: Sizes                                                 */
/*==============================================================*/
create table Sizes
(
   idSize               smallint not null auto_increment,
   name                 char(30) not null,
   primary key (idSize)
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

alter table DatasheetsItems add constraint FK_componer foreign key (idProduct)
      references Products (idProduct) on delete restrict on update restrict;

alter table DatasheetsItems add constraint FK_componer2 foreign key (idItem)
      references Items (idItem) on delete restrict on update restrict;

alter table DatasheetsLabors add constraint FK_crear foreign key (idProduct)
      references Products (idProduct) on delete restrict on update restrict;

alter table DatasheetsLabors add constraint FK_crear2 foreign key (idLabor)
      references Labors (idLabor) on delete restrict on update restrict;

alter table InitialItems add constraint FK_medir2 foreign key (idMeasure)
      references Measures (idMeasure) on delete restrict on update restrict;

alter table Items add constraint FK_medir1 foreign key (idMeasure)
      references Measures (idMeasure) on delete restrict on update restrict;

alter table Products add constraint FK_medir3 foreign key (idSize)
      references Sizes (idSize) on delete restrict on update restrict;

alter table PurchaseOrders add constraint FK_hacer foreign key (idCard)
      references Users (idCard) on delete restrict on update restrict;

alter table PurchaseOrdersDetails add constraint FK_estar foreign key (idPurchaseOrder)
      references PurchaseOrders (idPurchaseOrder) on delete restrict on update restrict;

alter table PurchaseOrdersDetails add constraint FK_estar2 foreign key (idItem)
      references Items (idItem) on delete restrict on update restrict;

alter table UserOperations add constraint FK_realizar foreign key (idCard)
      references Users (idCard) on delete restrict on update restrict;

alter table Users add constraint FK_pertenecer foreign key (idRol)
      references UserRoles (idRol) on delete restrict on update restrict;

