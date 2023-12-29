using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public interface IUsuariosService<T, V>
    {
        public Respuesta<List<V>> ListarUsuarios();
        public Respuesta<T> InsertarUsuarios(UsuarioDto usuariosDto);
        public Respuesta<T> ActualizarUsuarios(UsuarioDto usuariosDto);
        public Respuesta<T> DesactivarUsuarios(UsuarioDto usuariosDto);

    }
}
