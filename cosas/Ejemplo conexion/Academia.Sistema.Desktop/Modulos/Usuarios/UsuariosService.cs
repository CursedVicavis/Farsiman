using Academia.Sistema.Desktop._Common;
using Academia.Sistema.Desktop._Login;
using Academia.Sistema.Desktop.Modulos.Sucursales._Models;
using Academia.Sistema.Desktop.Modulos.Usuarios._Models;
using Academia.Sistema.Desktop.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Modulos.Usuarios
{
    internal class UsuariosService
    {
        private readonly UsuariosClient _usuariosClient;

        public UsuariosService()
        {
            _usuariosClient = new UsuariosClient();
        }

        public async Task<bool> ObtenerUsuarios()
        {
            var listarUsuarios = await _usuariosClient.ObtenerUsuarios();
            foreach (var usuarios in listarUsuarios.Data)
            {
                Console.WriteLine($"ID: {usuarios.IdUsuario} - Usuario: {usuarios.Nombre} - Aciva: {usuarios.Estado}");
            }
            return true;
        }
        public async Task<bool> AgregarUsuario()
        {
            string admin; 
            UsuariosDto dto = new();
            Console.WriteLine("Ingrese el nombre de usuario: ");
            dto.Nombre = Console.ReadLine();
            Console.WriteLine("Ingrese la contraseña: ");
            dto.Contrasena = Console.ReadLine();
            Console.WriteLine("Ingrese el id del rol: ");
            dto.IdRol = int.Parse(Console.ReadLine());
            Console.WriteLine("Es admin? S/N: ");
            admin = Console.ReadLine();
            if (admin.ToUpper() == "S")
                dto.EsAdmin = true;
            else if (admin.ToUpper() == "N")
                dto.EsAdmin = false;
            else
                dto.EsAdmin = false;
            
            dto.Estado = true;

            var listarUsuarios = await _usuariosClient.AgregarUsuarios(dto);
            foreach (var usuarios in listarUsuarios.Data)
            {
                Console.WriteLine($"ID: {usuarios.IdUsuario} - Usuario: {usuarios.Nombre} - Aciva: {usuarios.Estado}");
            }
            return true;
        }
        public async Task<bool> Login()
        {
            LoginDto dto = new LoginDto();
            Console.WriteLine("Ingrese su usuario:");
            dto.Nombre = Console.ReadLine();

            Console.WriteLine("Ingrese su contraseña:");
            dto.Contrasena = Console.ReadLine();
                
            var listaEmpresas = await _usuariosClient.Login(dto);
            if(listaEmpresas.Codigo == "200")
                return true;
            else if(listaEmpresas.Codigo == "500")
                return false;
            else
                return false;
        }
    }
}
