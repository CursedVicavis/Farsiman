using Academia.Sistema.Desktop._Common;
using Academia.Sistema.Desktop.Modulos.Sucursales._Models;
using Academia.Sistema.Desktop.Modulos.Usuarios._Models;
using Academia.Sistema.Desktop.Utility;
using Farsiman.Application.Core.Standard.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Modulos.Usuarios
{
    internal class UsuariosClient
    {
        public async Task<Respuesta<List<UsuariosDto>>> ObtenerUsuarios()
        {
            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.GetAsync<Respuesta<List<UsuariosDto>>>("Usuarios/Listar");
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Obtener Usuarios:" + respuesta.Item2);
                return new Respuesta<List<UsuariosDto>>();
            }
            return respuesta.Item1;
        }

        public async Task<Respuesta<List<UsuariosDto>>> AgregarUsuarios(UsuariosDto dto)
        {
            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.PostAsync<Respuesta<List<UsuariosDto>>>($"Usuarios/Insertar", dto);
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Obtener Usuarios:" + respuesta.Item2);
                return new Respuesta<List<UsuariosDto>>();
            }
            return respuesta.Item1;
        }
        public async Task<Respuesta<List<LoginDto>>> Login(LoginDto dto)
        {

            HttpClientFs client = new HttpClientFs(RutaApi.Ruta.GetApiRoute());
            var respuesta = await client.GetAsync<Respuesta<List<LoginDto>>>($"Usuarios/Login?nombre={dto.Nombre}&contrasena={dto.Contrasena}");
            if (!string.IsNullOrEmpty(respuesta.Item2))
            {
                Console.WriteLine("Bienvenido:" + respuesta.Item2);
                return new Respuesta<List<LoginDto>>();
            }
            return respuesta.Item1;
        }
    }
}
