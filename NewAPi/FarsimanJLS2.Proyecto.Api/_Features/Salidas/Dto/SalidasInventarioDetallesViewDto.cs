namespace FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto
{
    public class SalidasInventarioDetallesViewDto
    {
        public int IdDetalle { get; set; }
        public int IdSalidaInventario { get; set; }
        public int IdLote { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; } = null!;
        public int CantidadProducto { get; set; }
    }
}
