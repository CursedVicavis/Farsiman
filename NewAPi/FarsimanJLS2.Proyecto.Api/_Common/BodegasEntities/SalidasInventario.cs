using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class SalidasInventario
    {
        public SalidasInventario()
        {
            SalidasInventarioDetalles = new HashSet<SalidasInventarioDetalle>();
        }

        public int IdSalidaInventario { get; set; }
        public int IdSucursal { get; set; }
        public int IdProductos { get; set; } 
        public int IdUsuario { get; set; }
        public DateTime? FechaSalida { get; set; }
        public int Total { get; set; }
        public DateTime? FechaRecivido { get; set; }
        public int IdUsuarioRecibe { get; set; }
        public int IdEstado { get; set; }
        public int cantidadProducto { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }
        public virtual Usuario IdEstadoNavigation { get; set; } = null!;
        public virtual Sucursale IdSucursalNavigation { get; set; } = null!;
        public virtual Producto IdProductosNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioRecibeNavigation { get; set; } = null!;
        public virtual Usuario UsuarioCreacion { get; set; } = null!;
        public virtual Usuario? UsuarioModificiacion { get; set; }
        public virtual ICollection<SalidasInventarioDetalle> SalidasInventarioDetalles { get; set; }
    }
}
