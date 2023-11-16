USE BOCE_DB

INSERT INTO Acce.tbRoles(role_Descripcion,usua_UsuarioCreacion,usua_FechaCreacion)
VALUES	('Jefe de Bodega',1,GETDATE()),
		('Visualizador',1,GETDATE())


DECLARE @contraseña NVARCHAR(MAX) = '123'
DECLARE @contrasenaEncriptada NVARCHAR(MAX)=(SELECT HASHBYTES('SHA2_512', @contraseña));
INSERT INTO Acce.tbUsuarios(usua_Nombre, usua_Contrasenia, empl_Id, role_Id, usua_EsAdmin,  usua_UsuarioCreacion, usua_FechaCreacion)
VALUES	('Carlos123',@contrasenaEncriptada,2,1,0,1,GETDATE()),
('redcat',@contrasenaEncriptada,2,2,0,1,GETDATE())

INSERT INTO Gral.tbEmpleados(empl_Nombre, empl_Sexo, empl_DNI)
VALUES	('Javier Lopez','M', '0501200506681'),
		('Carlos Ortega', 'M', '0501200312311')

INSERT INTO Acce.tbPantallas(pant_Nombre,pant_URL,pant_Esquema,usua_UsuarioCreacion,usua_FechaCreacion) 
VALUES ('Usuarios','/dashboards/Usuarios', 'ni idea xd',1,GETDATE()),
('Salidas','/dashboards/Salidas', 'ni idea xd',1,GETDATE())

INSERT INTO Acce.tbRolesXPantallas(pant_Id,role_Id,usua_UsuarioCreacion,usua_FechaCreacion)
VALUES (1,1,1,GETDATE()),
 (2,1,1,GETDATE()),
 (1,2,1,GETDATE()),
 (2,2,1,GETDATE())
 

 INSERT INTO Bode.tbSucursale(sucu_Nombre)
 VALUES ('StockMundo'),('InventaGestión'),('ControlInventiva'),('Inventarios Ágil'),('OptiStock')

 INSERT INTO Bode.tbProductos(prod_Descripcion,prod_Precio,usua_UsuarioCreacion,usua_FechaCreacion)
 VALUES ('Delicias de Albóndigas de Quinoa y Espinacas', 129.99,1,GETDATE()),
 ('Salsa de Mango Ahumado Picante', 79.99,1,GETDATE()),
 ('Fideos de Calabacín con Pesto de Aguacate', 49.99,1,GETDATE()),
 ('Galletas Integrales de Avena y Arándanos', 89.99,1,GETDATE()),
 ('Sopa de Lentejas con Tomate y Albahaca', 59.99,1,GETDATE()),
 ('Barritas Energéticas de Cacao y Coco', 39.99,1,GETDATE());

INSERT INTO Bode.tbLotes(prod_Id,lote_FechaVencimiento,lote_Cantidad,lote_Precio)
VALUES (1,'2023-11-14 14:00:00',10,1300),
(1,'2024-09-16 15:00:00',5,700),
(2,'2023-10-27 14:00:00',20,1600),
(2,'2025-12-12 14:00:00',25,2000),
(3,'2023-11-20 14:00:00',3,150),
(3,'2023-11-25 14:00:00',2,140),
(4,'2025-03-30 14:00:00',9,800),
(4,'2026-06-29 14:00:00',13,1200),
(5,'2025-10-05 14:00:00',40,2500),
(5,'2025-10-24 14:00:00',2,150),
(6,'2028-01-22 14:00:00',20,800),
(6,'2028-01-12 14:00:00',30,1200)

INSERT INTO Bode.tbSalidas(sucu_Id,sali_Fecha,usua_UsuarioCreacion,usua_FechaCreacion,sali_Estado)
VALUES(1,'2024-11-19 15:00:00',1,GETDATE(),1),
(2,'2024-11-20 15:00:00',1,GETDATE(),2),
(3,'2024-11-21 15:00:00',1,GETDATE(),1),
(4,'2024-11-22 15:00:00',1,GETDATE(),1),
(5,'2024-11-23 15:00:00',1,GETDATE(),2),
(5,'2024-11-24 15:00:00',1,GETDATE(),1)

INSERT INTO Bode.tbSalidasDetalles(sali_Id,prod_Id,sade_Cantidad)
VALUES (1,1,11),
(1,2,4),
(2,3,5),
(3,4,20),
(4,5,10),
(5,5,12),
(5,6,10),
(6,6,10)

