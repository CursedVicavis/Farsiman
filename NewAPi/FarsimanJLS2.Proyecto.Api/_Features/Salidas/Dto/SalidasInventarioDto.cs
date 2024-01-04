namespace FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto
{
    public class SalidasInventarioDto
    {
        public int IdSalidaInventario { get; set; }
        public int IdSucursal { get; set; }
        public int IdUsuario { get; set; }
        public DateTime? FechaSalida { get; set; }
        public int Total { get; set; }
        public DateTime? FechaRecivido { get; set; }
        public int cantidadProducto { get; set; }
        public int IdUsuarioRecibe { get; set; }
        public int UsuarioCreacionId { get; set; }
        public List<SalidasInventarioDetallesDto>? Detalles { get; set; }
    }
}
