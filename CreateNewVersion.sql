--CREATE DATABASE BOCE_DB
use BOCE_DB

CREATE TABLE Perfiles(
  IdPerfil					INT IDENTITY,  
  Nombre					VARCHAR(100) UNIQUE		NOT NULL,

  UsuarioCreacionId			INT						NOT NULL,
  FechaCreacion				DATETIME				NOT NULL,
  UsuarioModificiacionId	INT						,	
  FechaModificacion			DATETIME				,
  Activo					BIT						NOT NULL DEFAULT 1
  CONSTRAINT PK_dbo_Perfiles_IdRol PRIMARY KEY(IdPerfil)
)
GO
INSERT INTO Perfiles(Nombre,UsuarioCreacionId,FechaCreacion)
VALUES('Admin',1,GETDATE())

CREATE TABLE Permisos(
  IdPermiso					INT IDENTITY,
  Nombre					VARCHAR(100)	NOT NULL,

  UsuarioCreacionId			INT				NOT NULL,
  FechaCreacion				DATETIME		NOT NULL,
  UsuarioModificiacionId	INT				,
  FechaModificacion			DATETIME		,
  Activo					BIT				NOT NULL DEFAULT 1
  CONSTRAINT PK_dbo_Permisos_IdPantalla PRIMARY KEY(IdPermiso)
)
GO
INSERT INTO Permisos(Nombre,UsuarioCreacionId,FechaCreacion)
VALUES ('Digitador',1,GETDATE())


CREATE TABLE PerfilesPorPermisos(
  IdPerfilPorPermiso		INT IDENTITY,
  IdPerfil					INT			NOT NULL,
  IdPermiso					INT			NOT NULL,

  UsuarioCreacionId			INT			NOT NULL,
  FechaCreacion				DATETIME	NOT NULL,
  UsuarioModificiacionId	INT			,
  FechaModificacion			DATETIME	,
  Activo					BIT			NOT NULL DEFAULT 1
  
  CONSTRAINT PK_dbo_PerfilesPorPermisos_IdPerfilPorPermiso			PRIMARY KEY(IdPerfilPorPermiso)
  CONSTRAINT FK_dbo_PerfilesPorPermisos_dbo_Perfiles_IdPerfil		FOREIGN KEY(IdPerfil)			REFERENCES Perfiles(IdPerfil),
  CONSTRAINT FK_dbo_PerfilesPorPermisos_dbo_Permisos_IdPermiso		FOREIGN KEY(IdPermiso)		REFERENCES Permisos(IdPermiso),
);
GO
INSERT INTO PerfilesPorPermisos(IdPerfil,IdPermiso,UsuarioCreacionId,FechaCreacion)
VALUES(1,1,1,GETDATE())

CREATE TABLE Empleados(
IdEmpleado					INT IDENTITY (1,1),
Nombre						VARCHAR(150)	NOT NULL,
Apellido					VARCHAR(150)	NOT NULL,
Direccion					VARCHAR(150)	NOT NULL,

  UsuarioCreacionId			INT			NOT NULL,
  FechaCreacion				DATETIME	NOT NULL,
  UsuarioModificiacionId	INT			,
  FechaModificacion			DATETIME	,
  Activo					BIT			NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_Empleados_IdEmpleado PRIMARY KEY (IdEmpleado)
)
GO
INSERT INTO Empleados(Nombre,Apellido,Direccion,UsuarioCreacionId,FechaCreacion)
VALUES('Javier','Lope','Alado de la pulperia mi pequeña bendicion',1,GETDATE())

CREATE TABLE Usuarios (
IdUsuario					INT IDENTITY (1,1),
IdEmpleado					INT NOT NULL,
Nombre						VARCHAR(150)	NOT NULL,
Contrasena					VARCHAR(150)	NOT NULL,
EsAdmin						BIT				,
IdPermiso					INT				,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL ,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1

CONSTRAINT PK_dbo_Usarios_IdUsuario PRIMARY KEY (IdUsuario),
CONSTRAINT FK_dbo_Usuarios_IdEmpleado_dbo_Empleados_IdEmpleado FOREIGN KEY (IdEmpleado) REFERENCES Empleados (IdEmpleado) ,
CONSTRAINT FK_dbo_Usuarios_IdPermiso_dbo_Permisos_IdPermiso FOREIGN KEY (IdPermiso) REFERENCES Permisos (IdPermiso) 
)--CAMBIAR
GO
INSERT INTO Usuarios (IdEmpleado,Nombre,Contrasena,EsAdmin,IdPermiso,UsuarioCreacionId,FechaCreacion)
VALUES(1,'javin','123',1,1,1,GETDATE())
CREATE TABLE Productos(
IdProductos					INT IDENTITY (1,1),
Nombre						VARCHAR(150)	NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_Productos_IdProductos PRIMARY KEY (IdProductos)
CONSTRAINT FK_dbo_Productos_UsuarioCreacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_Productos_UsuarioModificiacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)

)
GO

CREATE TABLE ProductosLotes(
IdLote						INT IDENTITY (1,1),
IdProducto					INT				NOT NULL,
CantidadInicial				INT				NOT NULL,
Costo						INT				NOT NULL,
FechaVencimiento			DATETIME,
Inventario					INT				NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_ProductosLotes_IdLote PRIMARY KEY (IdLote)
CONSTRAINT FK_dbo_ProductosLotes_UsuarioCreacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_ProductosLotes_UsuarioModificiacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)

)
GO

CREATE TABLE Estados(
IdEstado					INT IDENTITY (1,1),
Nombre						VARCHAR(150)	NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_Estados_IdEstado PRIMARY KEY (IdEstado)
CONSTRAINT FK_dbo_Estados_UsuarioCreacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_Estados_UsuarioModificiacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)
)
GO

CREATE TABLE Sucursales(
IdSucursal					INT IDENTITY (1,1),
Nombre						VARCHAR(150)	NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_Sucursales_IdSucursal PRIMARY KEY (IdSucursal)
CONSTRAINT PK_dbo_Sucursales_UsuarioCreacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT PK_dbo_Sucursales_UsuarioModificiacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)
)
GO

CREATE TABLE SalidasInventario(
IdSalidaInventario			INT IDENTITY (1,1),
IdSucursal					INT				NOT NULL,
IdUsuario					INT				NOT NULL,
FechaSalida					DATETIME		,
Total						INT				NOT NULL,
FechaRecivido				DATETIME		,
IdUsuarioRecibe				INT				NOT NULL,
IdEstado					INT				NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_SalidasInventario_IdSalidaInventario  PRIMARY KEY (IdSalidaInventario),
CONSTRAINT FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuario FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_SalidasInventario_IdEstado_dbo_Estados_IdEstado FOREIGN KEY (IdEstado) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_SalidasInventario_IdSucursal_dbo_Sucursales_IdUsuario FOREIGN KEY(IdSucursal) REFERENCES Sucursales (IdSucursal),
CONSTRAINT FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuarioRecibe FOREIGN KEY (IdUsuarioRecibe) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_SalidasInventario_UsuarioCreacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_SalidasInventario_UsuarioModificiacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)
)

CREATE TABLE SalidasInventarioDetalles(
IdDetalle					INT IDENTITY (1,1),
IdSalidaInventario			INT				NOT NULL,
IdLote						INT				NOT NULL,
CantidadProducto			INT				NOT NULL,

UsuarioCreacionId			INT				NOT NULL,
FechaCreacion				DATETIME		NOT NULL,
UsuarioModificiacionId		INT				,
FechaModificacion			DATETIME		,
Activo						BIT				NOT NULL DEFAULT 1
CONSTRAINT PK_dbo_SalidasInventarioDetalles_IdDetalle PRIMARY KEY (IdDetalle),
CONSTRAINT FK_dbo_SalidasInventarioDetalles_IdSalidaInventario_dbo_SalidasInventario_IdSalidaInventario FOREIGN KEY (IdSalidaInventario) REFERENCES SalidasInventario (IdSalidaInventario),
CONSTRAINT FK_dbo_SalidasInventarioDetalles_IdLote_dbo_ProductosLotes_IdLote FOREIGN KEY (IdLote) REFERENCES ProductosLotes (IdLote),
CONSTRAINT FK_dbo_SalidasInventarioDetalles_UsuarioCreacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuarios(IdUsuario),
CONSTRAINT FK_dbo_SalidasInventarioDetalles_UsuarioModificiacionId_dbo_Usuarios_IdUsuario FOREIGN KEY (UsuarioModificiacionId) REFERENCES Usuarios(IdUsuario)
)
