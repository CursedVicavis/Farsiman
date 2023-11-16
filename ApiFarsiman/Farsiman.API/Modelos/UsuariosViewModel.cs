namespace Farsiman.API.Modelos
{
    public class UsuariosViewModel
    {
        public int usua_Id { get; set; }
        public string? usua_Nombre { get; set; }
        public string? usua_Contrasenia { get; set; }
        public int empl_Id { get; set; }
        public int role_Id { get; set; }
        public string? role_Descripcion { get; set; }
        public bool usua_EsAdmin { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public bool? usua_Estado { get; set; }

    }
}
