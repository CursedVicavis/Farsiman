using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class SalidasInventarioDetalle
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

        public virtual ProductosLote IdLoteNavigation { get; set; } = null!;
        public virtual SalidasInventario IdSalidaInventarioNavigation { get; set; } = null!;
        public virtual Usuario UsuarioCreacion { get; set; } = null!;
        public virtual Usuario? UsuarioModificiacion { get; set; }
    }
}
