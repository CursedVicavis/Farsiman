namespace FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto
{
    public class ProductoDto
    {
        public int IdProductos { get; set; }
        public string Nombre { get; set; } = null!;
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
    }
}
