/*
DROP DATABASE BOCE_DB
*/

CREATE DATABASE BOCE_DB
USE BOCE_DB

CREATE SCHEMA Acce
GO
CREATE SCHEMA Gral
GO
CREATE SCHEMA Bode
GO



CREATE TABLE Acce.tbUsuarios(
		usua_Id 					INT IDENTITY(1,1),
		usua_Nombre					NVARCHAR(100) 	NOT NULL,
		usua_Contrasenia			NVARCHAR(MAX) 	NOT NULL,
		empl_Id						INT 			NOT NULL,
		role_Id						INT				NOT NULL,
		usua_EsAdmin				BIT 			NOT NULL,
		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
		usua_Estado					BIT				DEFAULT 1,
	CONSTRAINT PK_Acce_tbUsuarios_usua_Id 				 PRIMARY KEY (usua_Id),
	CONSTRAINT UQ_acce_tbUsuarios_usua_Nombre UNIQUE(usua_Nombre),
);
GO

CREATE TABLE Gral.tbEmpleados(
		empl_Id						INT IDENTITY(1,1),
		empl_Nombre					NVARCHAR(250),
		empl_Sexo					CHAR(1),
		empl_DNI					CHAR(13)
	CONSTRAINT PK_Gral_tbEmpleados_empl_Id PRIMARY KEY (empl_Id),
)
GO

CREATE TABLE Acce.tbRoles
(
		role_Id						INT 			IDENTITY(1,1),
		role_Descripcion			NVARCHAR(500),

		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
		usua_Estado					BIT				DEFAULT 1,

	CONSTRAINT PK_Acce_tbRoles_role_Id 				PRIMARY KEY (role_Id),
	CONSTRAINT UQ_acce_tbRoles_role_Descripcion 	UNIQUE(role_Descripcion),
	CONSTRAINT FK_Acce_tbRoles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbRoles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),

);
GO

CREATE TABLE Acce.tbPantallas(
		pant_Id						INT 			IDENTITY(1,1),
		pant_Nombre					NVARCHAR(100),
		pant_URL					NVARCHAR(100),
		pant_Esquema				NVARCHAR(100),

		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
		usua_Estado					BIT				DEFAULT 1,

	CONSTRAINT PK_Acce_tbPantallas_pant_Id	PRIMARY KEY (pant_Id),
	CONSTRAINT FK_Acce_tbPantallas_pant_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id 	 FOREIGN KEY(usua_UsuarioCreacion) 	   REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbPantallas_pant_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id)
);
GO

CREATE TABLE Acce.tbRolesXPantallas(
		ropa_Id						INT	IDENTITY(1,1),
		pant_Id						INT,
		role_Id						INT,

		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
		usua_Estado					BIT				DEFAULT 1,

	CONSTRAINT PK_Acce_tbRolesXPantallas_ropa_Id PRIMARY KEY (ropa_Id),
	CONSTRAINT UQ_Acce_tbRolesXPantallas_pant_Id_role_Id					UNIQUE(role_Id, pant_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_pant_Id_Acce_tbPantallas_pant_Id   FOREIGN KEY(pant_Id) REFERENCES Acce.tbPantallas (pant_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_role_Id_Acce_tbRoles_role_Id 		FOREIGN KEY(role_Id) REFERENCES Acce.tbRoles (role_Id),

	CONSTRAINT FK_Acce_tbRolesXPantallas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id     FOREIGN KEY(usua_UsuarioCreacion)     REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Acce_tbRolesXPantallas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY(usua_UsuarioModificacion) REFERENCES Acce.tbUsuarios (usua_Id),
);
GO

DECLARE @contraseña NVARCHAR(MAX) = '123456'
DECLARE @contrasenaEncriptada NVARCHAR(MAX)=(SELECT HASHBYTES('SHA2_512', @contraseña));
INSERT INTO Acce.tbUsuarios(usua_Nombre, usua_Contrasenia, empl_Id, role_Id, usua_EsAdmin,  usua_UsuarioCreacion, usua_FechaCreacion)
VALUES ('javier',@contrasenaEncriptada,1,1,1,1,GETDATE())

GO


CREATE TABLE Bode.tbProductos(
		prod_Id						INT IDENTITY (1,1),
		prod_Descripcion			NVARCHAR(150) NOT NULL,
		prod_Precio					DECIMAL(18,2), 
		
		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
	CONSTRAINT PK_Bode_tbProductos_prod_Id PRIMARY KEY (prod_Id),
	CONSTRAINT PK_Bode_tbProductos_prod_Descripcion UNIQUE(prod_Descripcion),
	CONSTRAINT FK_Bode_tbProductos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Bode_tbProductos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),
)

CREATE TABLE Bode.tbLotes(
		lote_Id						INT IDENTITY (1,1),
		prod_Id						INT NOT NULL,
		lote_FechaVencimiento		DATETIME,
		lote_Cantidad				INT,
		lote_Precio					INT,
	CONSTRAINT PK_Bode_tbLotes_lote_Id PRIMARY KEY (lote_Id),
	CONSTRAINT FK_Bode_tbLotes_prod_Id_tbProductos_prod_Id FOREIGN KEY (prod_Id) REFERENCES Bode.tbProductos (prod_Id),
)

CREATE TABLE Bode.tbSucursale(
		sucu_Id						INT IDENTITY (1,1),
		sucu_Nombre					NVARCHAR(250),
	CONSTRAINT PK_Bode_tbSucursale_sucu_Id PRIMARY KEY (sucu_Id),
	CONSTRAINT PK_Bode_tbSucursale_sucu_Nombre UNIQUE(sucu_Nombre),
)

CREATE TABLE Bode.tbSalidas (
		sali_Id						INT IDENTITY (1,1),
		sucu_Id						INT,
		sali_Fecha					DATETIME,
		usua_UsuarioCreacion 		INT				NOT NULL,
		usua_FechaCreacion 			DATETIME 		NOT NULL,
		usua_UsuarioModificacion	INT				DEFAULT NULL,
		usua_FechaModificacion		DATETIME 		DEFAULT NULL,
		sali_Estado					INT,--(1 = Enviado a Sucursal 2 = Recibo en Sucursal)
	CONSTRAINT PK_Bode_tbSalidas_sali_Id PRIMARY KEY (sali_Id),
	CONSTRAINT FK_Bode_tbSucursale_sucu_Id_tbSucursale_sucu_Id FOREIGN KEY (sucu_Id) REFERENCES Bode.tbSucursale (sucu_Id),
	CONSTRAINT FK_Bode_tbSalidasDetalles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id		FOREIGN KEY (usua_UsuarioCreacion)		REFERENCES Acce.tbUsuarios (usua_Id),
	CONSTRAINT FK_Bode_tbSalidasDetalles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id FOREIGN KEY (usua_UsuarioModificacion)	REFERENCES Acce.tbUsuarios (usua_Id),

)


CREATE TABLE Bode.tbSalidasDetalles(
		sade_Id						INT IDENTITY (1,1),
		sali_Id						INT,
		prod_Id						INT,
		sade_Cantidad				INT,

)
ALTER TABLE Acce.tbUsuarios ADD CONSTRAINT FK_Acce_tbUsuarios_empl_Id_Gral_tbEmpleados_empl_Id FOREIGN KEY (empl_Id) REFERENCES Gral.tbEmpleados (empl_Id)