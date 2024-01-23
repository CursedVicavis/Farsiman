using Academia.Sistema.Desktop._Common.Entities;
using Academia.Sistema.Desktop._Common;
using Academia.Sistema.Desktop.Utility;
using Academia.Sistema.Desktop.Modulos.Sucursales._Models;

namespace Academia.Sistema.Desktop.Modulos.Sucursales
{
    public class SucursalClient
    {
        public async Task<List<SucursalDto>> ObtenerSucursales()
        {
            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.GetAsync<List<SucursalDto>>("Sucursal/ObtenerSucursales");
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Obtener Sucursales:" + respuesta.Item2);
                return new List<SucursalDto>();
            }
            return respuesta.Item1;
        }

        public async Task<List<SucursalDto>> AgregarSucursal(SucursalDto dto)
        {
            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.PostAsync<List<SucursalDto>>($"Sucursal/AgregarSucursal", dto);
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Obtener Sucursales:" + respuesta.Item2);
                return new List<SucursalDto>();
            }
            return respuesta.Item1;
        }
    }
}
