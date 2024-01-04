namespace FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto
{
    public class SalidasInventarioViewDto
    {
        public int IdSalidaInventario { get; set; }
        public int IdSucursal { get; set; }
        public string NombreSucursal { get; set; } = null!;
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public int IdEmpleado { get; set; }
        public string NombreEmpleado { get; set; } = null!;
        public DateTime? FechaSalida { get; set; }
        public int Total { get; set; }
        public DateTime? FechaRecivido { get; set; }
        public int IdUsuarioRecibe { get; set; }
        public string NombreUsuarioRecibe { get; set; } = null!;
        public int IdEstado { get; set; }
        public int cantidadProducto { get; set; }
        public string NombreEstado { get; set; } = null!;
        public List<SalidasInventarioDetallesViewDto>? Detalles { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
    }
}
