alter table SalidasInventario
add IdProductos INT CONSTRAINT FK_dbo_SalidasInventario_IdProductos_Productos_IdProductos
FOREIGN KEY (IdProductos) REFERENCES Productos (IdProductos)

SELECT * FROM Productos
INSERT INTO Productos(Nombre, UsuarioCreacionId,FechaCreacion)
VALUES ('Ibuprofeno',1,GETDATE())

SELECT * FROM Empleados 
INSERT INTO Empleados(Nombre, Apellido,Direccion,UsuarioCreacionId,FechaCreacion)
VALUES ('Sarai','Quintanilla','Col. El Carmen calle bom dia',1,GETDATE())

SELECT * FROM Estados
INSERT INTO Estados(Nombre,UsuarioCreacionId,FechaCreacion)
VALUES ('Enviada a sucursal',1,GETDATE()),
('Entregada',1,GETDATE())

SELECT * FROM Perfiles
INSERT INTO Perfiles (Nombre,UsuarioCreacionId,FechaCreacion)
VALUES ('Jefe de bodega',1,GETDATE())

SELECT * FROM ProductosLotes
INSERT INTO ProductosLotes (IdProducto,CantidadInicial,Costo,FechaVencimiento,Inventario,UsuarioCreacionId,FechaCreacion)
VALUES (1,10,10,'2024-01-05',10,1,GETDATE()),
(1,20,10,'2024-01-04',19,1,GETDATE()),
(1,20,10,'2024-01-03',15,1,GETDATE())

SELECT * FROM Sucursales
INSERT INTO Sucursales(Nombre, UsuarioCreacionId,FechaCreacion )
VALUES ('Sucursales',1, GETDATE())

SELECT * FROM SalidasInventario 
INSERT INTO SalidasInventario (IdSucursal,IdUsuario,FechaSalida,Total,IdEstado,UsuarioCreacionId,FechaCreacion,cantidadProducto,IdProductos)
VALUES (1,1,'2024-01-03',50,1,1,GETDATE(),10,1)

ALTER TABLE SalidasInventario
DROP [FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuarioRecibe]

ALTER TABLE SalidasInventario
ADD IdUsuarioRecibe INT NULL CONSTRAINT FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuarioRecibe 
FOREIGN KEY (IdUsuarioRecibe) REFERENCES Usuarios(Idusuario)

SELECT * FROM SalidasInventarioDetalles
INSERT INTO SalidasInventarioDetalles (IdSalidaInventario,IdLote,CantidadProducto,UsuarioCreacionId,FechaCreacion)
VALUES (3,1,5,1,GETDATE())