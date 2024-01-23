using Academia.Proyecto.WebApi._Features.Sucursales.Entities;

namespace Academia.Proyecto.WebApi._Features.Sucursales
{
    public class SucursalService
    {
        public SucursalService() 
        {

        }

        public List<Sucursal> ObtenerSucursales()
        {
            List<Sucursal> sucursales =
        [
            new() { SucursalId = 1, NombreSucursal = "Sucursal Central", Activa = true },
            new() { SucursalId = 2, NombreSucursal = "Sucursal Norte", Activa = false },
            new() { SucursalId = 3, NombreSucursal = "Sucursal Sur", Activa = true },
            new() { SucursalId = 4, NombreSucursal = "Sucursal Este", Activa = false },
            new() { SucursalId = 5, NombreSucursal = "Sucursal Oeste", Activa = true },
            new() { SucursalId = 6, NombreSucursal = "Sucursal Principal", Activa = false },
            new() { SucursalId = 7, NombreSucursal = "Sucursal Central 2", Activa = true },
            new() { SucursalId = 8, NombreSucursal = "Sucursal Norte 2", Activa = false },
            new() { SucursalId = 9, NombreSucursal = "Sucursal Sur 2", Activa = true },
            new() { SucursalId = 10, NombreSucursal = "Sucursal Este 2", Activa = false }
        ];
            return sucursales;
        }

        public List<Sucursal> AgregarSucursal(Sucursal sucursal)
        {
            var listaSucursal = ObtenerSucursales();
            listaSucursal.Add(sucursal);
            return listaSucursal;
        }
    }
}
