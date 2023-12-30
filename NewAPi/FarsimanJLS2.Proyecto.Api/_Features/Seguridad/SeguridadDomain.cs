using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using System.Data;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SeguridadDomain
    {
        public bool ValidacionesUsuarios(UsuarioDto usuariosDto, int? roleId, List<Perfile> role, List<Usuario> usuario,int num) //0 = insertar, 1 = actualizar
        {
            if (num == 1)
            {
                if (!ValidarIdActualizarExiste(usuariosDto.IdUsuario, usuario))
                    return false;
            }            
            if (!VaciosValidadUsuarios(usuariosDto))
                return false;
            if(!ValidarRolExiste(roleId, role))
                return false;
            if(!ValidarUsuarioExiste(usuariosDto, usuario))
                return false;

            return true;
        }
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
                return true;

            return false;
        }
        public bool ValidarUsuarioExiste(UsuarioDto usuariosDto, List<Usuario> usuario)//si es true, no existe
        {
            var respuesta = usuario.Where(x => x.Nombre == usuariosDto.Nombre).ToList();
            if (respuesta.Count == 0)
                return true;
         
            return false;
        }
        public bool ValidarIdActualizarExiste(int? IdUsuario, List<Usuario> usuario)
        {
            var respuesta = usuario.Where(x => x.IdUsuario == IdUsuario).ToList();
            if (respuesta.Count > 0)
                return true;
            return false;
        }
    }
}
