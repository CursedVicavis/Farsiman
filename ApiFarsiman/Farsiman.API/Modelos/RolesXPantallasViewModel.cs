namespace Farsiman.API.Modelos
{
    public class RolesXPantallasViewModel
    {
        public int ropa_Id { get; set; }
        public int? pant_Id { get; set; }
        public string? pant_Nombre { get; set; }
        public string? pant_URL { get; set; }
        public string? pant_Esquema { get; set; }
        public int? role_Id { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public bool? usua_Estado { get; set; }
    }
}
