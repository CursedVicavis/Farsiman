namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto
{
    public class PerfilePorPermisoDto
    {
        public int IdPerfilPorPermiso { get; set; }
        public int IdPerfil { get; set; }
        public int IdPermiso { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }

    }
}
