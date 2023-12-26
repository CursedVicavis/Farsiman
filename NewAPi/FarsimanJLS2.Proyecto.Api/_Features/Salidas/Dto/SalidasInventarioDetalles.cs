namespace FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto
{
    public class SalidasInventarioDetalles
    {
        public int IdDetalle { get; set; }
        public int IdSalidaInventario { get; set; }
        public int IdLote { get; set; }
        public int CantidadProducto { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
    }
}
