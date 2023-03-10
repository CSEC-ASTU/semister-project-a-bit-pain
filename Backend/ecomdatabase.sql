CREATE DATABASE ecomwebsite;
use ecomwebsite;
CREATE TABLE laptop(ID varchar(50) NOT NULL,
					brand varchar(50) NOT NULL,
					name varchar(50) NOT NULL,
					ram varchar(50) NOT NULL,
					display varchar(50) NOT NULL,
					storagessd varchar(50) NOT NULL,
					storagehdd varchar(50) NOT NULL,
					cpuprocessor varchar(50) NOT NULL,
					cpugeneration varchar(50) NOT NULL,
					graphicscardname varchar(50) NOT NULL,
					graphicscardsize varchar(50) NOT NULL,
					battery varchar(50) NOT NULL,
					screensize varchar(50) NOT NULL,
					price varchar(50) NOT NULL,
					description varchar(100000) NOT NULL,
					types varchar(50) NOT NULL,
					isdeleted varchar(50) NOT NULL,
					PRIMARY KEY(ID));
CREATE TABLE phone (ID varchar(50) NOT NULL,
					brand varchar(50) NOT NULL,
					name varchar(50) NOT NULL,
					ram varchar(50) NOT NULL,
					storage varchar(50) NOT NULL,
					color varchar(50) NOT NULL,
					screensize varchar(50) NOT NULL,
					camerafront varchar(50) NOT NULL,
					cameraback varchar(50) NOT NULL,
					price varchar(50) NOT NULL,
					description varchar(100000) NOT NULL,
					types varchar(50) NOT NULL,
					isdeleted varchar(50) NOT NULL,
					PRIMARY KEY(ID));
CREATE TABLE tv (ID varchar(50) NOT NULL,
				 brand varchar(50) NOT NULL,
				 name varchar(50) NOT NULL,
				 screensize varchar(50) NOT NULL,
				 displaytechnology varchar(50) NOT NULL,
				 resolution varchar(50) NOT NULL,
				 refreshrate varchar(50) NOT NULL,
				 connectivity varchar(50) NOT NULL,
				 price varchar(50) NOT NULL,
				 description varchar(100000) NOT NULL,
				 types varchar(50) NOT NULL,
				 isdeleted varchar(50) NOT NULL,
				 PRIMARY KEY(ID));
CREATE TABLE accessories (ID varchar(50) NOT NULL,
						  brand varchar(50) NOT NULL,
						  name varchar(50) NOT NULL,
						  price varchar(50) NOT NULL,
						  description varchar(100000) NOT NULL,
						  types varchar(50) NOT NULL,
						  isdeleted varchar(50) NOT NULL,
						  PRIMARY KEY(ID));
CREATE TABLE user (UID varchar(50) NOT NULL,
				   username varchar(50) NOT NULL,
				   firstname varchar(50) NOT NULL,
				   lastname varchar(50) NOT NULL,
				   email varchar(50) NOT NULL,
				   phone varchar(50) NOT NULL,
				   isdeleted varchar(50) NOT NULL,
				   password varchar(50) NOT NULL,
				   types varchar(50) NOT NULL,
				   PRIMARY KEY(UID));
CREATE TABLE images (IID int NOT NULL AUTO_INCREMENT,
					 ID varchar(50) NOT NULL,
					 imagepath varchar(50) NOT NULL,
					 imagerefer varchar(50) NOT NULL,
					 PRIMARY KEY(IID));
CREATE TABLE uploader(UPID varchar(50) NOT NULL,
					  ID varchar(50) NOT NULL,
					  UID varchar(50) NOT NULL,
					  PRIMARY KEY(UPID),
					  FOREIGN KEY(UID) REFERENCES user (UID),
					  FOREIGN KEY(ID) REFERENCES laptop (ID),
				   	  FOREIGN KEY(ID) REFERENCES phone (ID),
				      FOREIGN KEY(ID) REFERENCES tv (ID),
				      FOREIGN KEY(ID) REFERENCES accessories (ID));
CREATE TABLE book (BID varchar(50) NOT NULL,
				   UID varchar(50) NOT NULL,
				   BOOKDATE varchar(50) NOT NULL,
				   totalprice varchar(50) NOT NULL,
				   PRIMARY KEY(BID));
CREATE TABLE itemslist (IID int NOT NULL AUTO_INCREMENT,
						BID varchar(50) NOT NULL,
						ID varchar(50) NOT NULL,
						quantity varchar(50) NOT NULL,
						price varchar(50) NOT NULL,
						name varchar(50) NOT NULL,
						PRIMARY KEY(IID),
						FOREIGN KEY(BID) REFERENCES book(BID));