using Academia.Sistema.Desktop._Common.Entities;
using Academia.Sistema.Desktop._Common;
using Academia.Sistema.Desktop.Utility;
using Farsiman.Application.Core.Standard.DTOs;

namespace Academia.Sistema.Desktop._Login
{
    public class LoginClient
    {
        //public async Task<(List<EmpresaDto>, string)> ObtenerEmpresas()
        //{
        //    HttpClientFs _client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
        //    var request = await _client.GetAsync<List<EmpresaDto>>("Empresa/ObtenerEmpresas");
        //    return request;
        //}

        public async Task<List<EmpresaDto>> ObtenerEmpresas()
        {
            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.GetAsync<List<EmpresaDto>>("Empresa/ObtenerEmpresas");
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Obtener Empresas:" + respuesta.Item2);
                return new List<EmpresaDto>();
            }
            return respuesta.Item1;
        }
    }
}
