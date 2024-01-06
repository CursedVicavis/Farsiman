namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto
{
    public class ProductoLoteViewDto
    {
        public int IdLote { get; set; }
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public int CantidadInicial { get; set; }
        public int Costo { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public int Inventario { get; set; }
    }
}
