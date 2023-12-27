namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto
{
    public class UsuarioDto
    {
        public int IdUsuario { get; set; }
        public int IdEmpleado { get; set; }
        public string Nombre { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
        public bool? EsAdmin { get; set; }
        public int? IdPerfil { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
    }
}
