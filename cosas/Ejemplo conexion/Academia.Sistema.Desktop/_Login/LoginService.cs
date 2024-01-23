using Academia.Sistema.Desktop._Common.Entities;
using Academia.Sistema.Desktop._Common;
using Academia.Sistema.Desktop.Utility;
using Academia.Sistema.Desktop.Modulos.Usuarios._Models;
using Academia.Sistema.Desktop.Modulos.Usuarios;

namespace Academia.Sistema.Desktop._Login
{
    public class LoginService
    {
        private readonly LoginClient _loginClient;
        public LoginService()
        {
            _loginClient = new LoginClient();
        }

       public async Task<bool> ObtenerEmpresasAsync() 
       {
            var listaEmpresas = await _loginClient.ObtenerEmpresas();
            foreach (var empresa in listaEmpresas)
            {
                Console.WriteLine($"ID: {empresa.Id}, Nombre: {empresa.Nombre}");
            }
            return true;
        }
    }
}
