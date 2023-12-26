namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto
{
    public class ProductosLoteDto
    {
        public int IdLote { get; set; }
        public int IdProducto { get; set; }
        public int CantidadInicial { get; set; }
        public int Costo { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public int Inventario { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
    }
}
