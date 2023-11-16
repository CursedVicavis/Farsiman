USE BOCE_DB

GO

CREATE OR ALTER PROCEDURE Acce.UDP_IniciarSesion --'carlos123', '123'
	@usua_Nombre			NVARCHAR(150),
	@usua_Contrasenia		NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
		DECLARE @contrasenaEncriptada NVARCHAR(MAX)=(SELECT HASHBYTES('SHA2_512', @usua_Contrasenia));

		IF EXISTS (SELECT * 
				   FROM Acce.tbUsuarios 
				   WHERE usua_Nombre = @usua_Nombre 
				   AND usua_Contrasenia = @contrasenaEncriptada
				   AND usua_Estado = 1)
			BEGIN
			SELECT usua_Id,
					   usua_Nombre,
					   usua.empl_Id,
					   usua.role_Id,
					   rol.role_Descripcion,
					   usua_EsAdmin
			
			FROM Acce.tbUsuarios usua
				LEFT JOIN Acce.tbRoles rol				ON usua.role_Id = rol.role_Id
				LEFT JOIN Gral.tbEmpleados empl			ON usua.empl_Id = empl.empl_Id
			WHERE usua_Nombre = @usua_Nombre 
				AND usua_Contrasenia = @contrasenaEncriptada
			END
		ELSE
			BEGIN
				SELECT 0
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE Acce.UDP_tbRolesXPantallas_Listar  
	@role_Id		INT
AS
BEGIN
	SELECT		T2.pant_Id,
				T2.pant_Nombre,
				T2.pant_URL
	FROM		Acce.tbRolesXPantallas T1 
	INNER JOIN	Acce.tbPantallas T2
	ON			T1.pant_Id = T2.pant_Id
	WHERE		T1.role_Id = @role_Id
END
GO

CREATE OR ALTER PROCEDURE Acce.UDP_tbUsuarios_Listar
AS
BEGIN
SELECT usua_Id, usua_Nombre, empl_Id, rol.role_Id,rol.role_Descripcion, 
usua_EsAdmin, usua.usua_UsuarioCreacion, usua.usua_FechaCreacion, 
usua.usua_UsuarioModificacion, usua.usua_FechaModificacion, usua.usua_Estado 
FROM Acce.tbUsuarios usua 
INNER JOIN Acce.tbRoles rol on usua.role_Id = rol.role_Id
END
GO

CREATE OR ALTER VIEW Bode.VW_tbSalidas_Listar
AS

SELECT sali_Id, 
sucu.sucu_Nombre, 
sucu.sucu_Id,
sali_Fecha,
crea.usua_Nombre,	
sali_Estado,
( SELECT sade_Id, 
sali_Id, 
prod.prod_Id, 
prod.prod_Descripcion,
(SELECT sum(lote_Precio) / sum(lote_Cantidad) from Bode.tbLotes lot WHERE lot.prod_Id = prod.prod_Id ) AS prod_PrecioReal ,
lote_Id,
lote_FechaVencimiento,
sade_Cantidad
FROM Bode.tbSalidasDetalles sade 
INNER JOIN Bode.tbProductos prod ON sade.prod_Id = prod.prod_Id
INNER JOIN Bode.tbLotes lote ON lote.prod_Id = prod.prod_Id
WHERE sali_Id = sali.sali_Id 

   FOR JSON PATH ) AS Detalles,
      (SELECT SUM(sape.sade_Cantidad ) AS sade_TotalItems
FROM bode.tbSalidasDetalles sape
INNER JOIN Bode.tbProductos pro ON sape.prod_Id = pro.prod_Id WHERE sape.sali_Id =sali.sali_Id  ) AS sade_TotalItems,
   (SELECT SUM(sape.sade_Cantidad * pro.prod_Precio) AS sade_Total
FROM bode.tbSalidasDetalles sape
INNER JOIN Bode.tbProductos pro ON sape.prod_Id = pro.prod_Id WHERE sape.sali_Id =sali.sali_Id
GROUP BY sali_Id ) AS sade_Total,
modi.usua_Nombre AS usua_Modifica,
sali.usua_FechaModificacion
FROM Bode.tbSalidas sali 
INNER JOIN Acce.tbUsuarios crea ON crea.usua_Id = sali.usua_UsuarioCreacion
INNER JOIN Bode.tbSucursale sucu ON sali.sucu_Id = sucu.sucu_Id 
LEFT JOIN Acce.tbUsuarios  modi ON modi.usua_Id = sali.usua_UsuarioModificacion
GO

CREATE OR ALTER PROCEDURE Bode.UDP_tbSalidas_Listar
AS
BEGIN
SELECT * FROM Bode.VW_tbSalidas_Listar 
END
GO


CREATE OR ALTER PROCEDURE Bode.UDP_tbSucursale_Listar
AS
BEGIN
SELECT * FROM tbSucursale
order by sucu_Id
END
GO

CREATE OR ALTER Procedure Bode.UDP_tbProducto_DDL
AS 
BEGIN
SELECT * FROM  tbProductos
END
GO


   
CREATE OR ALTER PROCEDURE Bode.UDP_tbSalida_Crear
@sucu_Id INT, 
@usua_UsuarioCreacion INT
AS
BEGIN
BEGIN TRY
		INSERT INTO tbSalidas (sucu_Id, sali_Fecha, sali_Estado,usua_UsuarioCreacion, usua_FechaCreacion)
		VALUES (@sucu_Id,GETDATE(),1,@usua_UsuarioCreacion, GETDATE())

		Select SCOPE_IDENTITY() AS sucu_Id
END TRY
BEGIN CATCH
SELECT 0 
END CATCH
END
GO

CREATE OR ALTER PROCEDURE Bode.UDP_tbSalida_Filtrar
@fechaInicio NVARCHAR(150),
@FechaFinal NVARCHAR(150),
@Sucursal  INT
AS
BEGIN
SELECT * FROM Bode.VW_tbSalidas_Listar WHERE sucu_Id = @Sucursal
AND sali_Fecha BETWEEN CAST(@fechaInicio as datetime) and  CAST(@FechaFinal as datetime)
END
GO

CREATE OR ALTER PROCEDURE Bode.UDP_tbSalida_AceptarSalida
@sali_Id	INT,
@usua_UsuarioModificacion	INT
AS
BEGIN
	UPDATE bode.tbSalidas 
	SET sali_Estado = 2,
	usua_UsuarioModificacion= @usua_UsuarioModificacion,
	usua_FechaModificacion = GETDATE()
	WHERE sali_Id = @sali_Id
	SELECT 'Recibido con exito'
END

go
CREATE OR ALTER PROCEDURE Bode.UDP_tbSalidaDetalles_Crear
@sali_Id INT, 
@prod_Id INT, 
@sade_Cantidad INT
AS
BEGIN
BEGIN TRY
IF  (select SUM(sape.sade_Cantidad * pro.prod_Precio) AS sade_Total FROM Bode.tbSalidas sali INNER JOIN bode.tbSalidasDetalles sape ON sali.sali_Id = sape.sali_Id INNER JOIN Bode.tbProductos pro ON sape.prod_Id = pro.prod_Id
WHERE sali.sali_Estado = 1 AND sali.sali_Id = @sali_Id GROUP BY sali.sali_Id ) >= 5000
	BEGIN
		SELECT 'Esta sucursal no puede realizar mas salidas'
	END
ELSE
	BEGIN
	   	IF (SELECT sum(lote_Cantidad) FROM Bode.tbLotes WHERE prod_Id = @prod_Id) > @sade_Cantidad 
			BEGIN 
				IF EXISTS (SELECT prod_Id FROM Bode.tbSalidasDetalles WHERE prod_Id = @prod_Id AND sali_Id = @sali_Id )
				BEGIN
					UPDATE Bode.tbSalidasDetalles 
					SET sade_Cantidad = (SELECT sade_Cantidad WHERE  prod_Id = @prod_Id AND sali_Id = @sali_Id ) + @sade_Cantidad
					WHERE  prod_Id = @prod_Id
					SELECT 1
				END
				ELSE
				BEGIN

				INSERT INTO tbSalidasDetalles (sali_Id, prod_Id, sade_Cantidad)
				VALUES (@sali_Id,@prod_Id,@sade_Cantidad)
				SELECT 1

				UPDATE Bode.tbLotes 
				set lote_Cantidad = (SELECT sum(lote_Cantidad) FROM Bode.tbLotes WHERE prod_Id = @prod_Id) - @sade_Cantidad
				WHERE lote_FechaVencimiento = (SELECT TOP 1 lote_FechaVencimiento FROM Bode.tbLotes where lote_Cantidad > 0 ORDER BY lote_FechaVencimiento asc) 
				END
			END
		ELSE IF (SELECT sum(lote_Cantidad) FROM Bode.tbLotes WHERE prod_Id = @prod_Id) < @sade_Cantidad 
			BEGIN
				SELECT 'No hay stock Suficiente'
			END
		
	END


END TRY
BEGIN CATCH
	SELECT 0 
END CATCH
END
GO


CREATE OR ALTER PROCEDURE Bode.UDP_tbLotes_RevisaStock 
@cantidad		INT,
@prod_Descripcion		NVARCHAR(250)
AS
BEGIN
SELECT CASE
	WHEN SUM(lote_Cantidad)  - @cantidad <= 0 THEN 'Stock Insuficiente'
	WHEN SUM(lote_Cantidad)  - @cantidad > 0 THEN 'Agregado Exitosamente'
	ELSE 'ERROR'
	end as Respuesta,
	SUM(lote_Cantidad) AS sade_Total
	FROM Bode.tbLotes lot inner join bode.tbProductos prod on lot.prod_Id = prod.prod_Id 
	WHERE prod_Descripcion = @prod_Descripcion
END 
GO
