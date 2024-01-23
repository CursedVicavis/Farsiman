using Academia.Sistema.Desktop.Modulos.Sucursales._Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Modulos.Sucursales
{
    public class SucursalService
    {
        private readonly SucursalClient _client;

        public SucursalService()
        {
            _client = new SucursalClient();
        }

        public async Task<bool> ObtenerSucursales() 
        {
            var listaSucursal = await _client.ObtenerSucursales();
            foreach (var sucursal in listaSucursal)
            {
                Console.WriteLine($"ID: {sucursal.SucursalId} - Sucursal: {sucursal.NombreSucursal} - Aciva: {sucursal.Activa}");
            }
            return true;
        }

        public async Task<bool> AgregarSucursal() 
        {
            SucursalDto dto = new();
            Console.WriteLine("Ingrese el Id de la Sucursal: ");
            dto.SucursalId = int.Parse(Console.ReadLine());
            Console.WriteLine("Ingrese el nombre de la Sucursal: ");
            dto.NombreSucursal = Console.ReadLine();
            dto.Activa = true;

            var listaSucursal = await _client.AgregarSucursal(dto);
            foreach (var sucursal in listaSucursal)
            {
                Console.WriteLine($"ID: {sucursal.SucursalId} - Sucursal: {sucursal.NombreSucursal} - Aciva: {sucursal.Activa}");
            }
            return true;
        }
    }
}
