using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using System.Data;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SeguridadDomain
    {
        public bool VaciosValidadUsuarios(UsuarioDto usuariosDto)
        {
            if (usuariosDto.Nombre != "" && usuariosDto.Contrasena != "" && usuariosDto.IdPerfil != 0)
                return true;

            return false;
        }
        public bool ValidarRolExiste(int? roleId, List<Perfile> role)
        {
            var respuesta = role.Where(x => x.IdPerfil == roleId).ToList();
            if (respuesta.Count > 0)
                return false;

            return true;
        }
        public bool ValidarUsuarioExiste(UsuarioDto usuariosDto, List<Usuario> usuario)//si es true, no existe
        {
            var respuesta = usuario.Where(x => x.Nombre == usuariosDto.Nombre).ToList();
            if (respuesta.Count == 0)
                return true;
            //else
            //{ 
            //    respuesta = usuario.Where(x => x.Nombre == usuariosDto.Nombre && x.IdUsuario == usuariosDto.IdUsuario).ToList();
            //    if (respuesta.Count == 0)
            //        return true;
            //}
            return false;
        }
    }
}
