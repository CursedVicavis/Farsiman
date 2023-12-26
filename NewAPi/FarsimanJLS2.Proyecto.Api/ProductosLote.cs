using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class ProductosLote
    {
        public ProductosLote()
        {
            SalidasInventarioDetalles = new HashSet<SalidasInventarioDetalle>();
        }

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

        public virtual Usuario UsuarioCreacion { get; set; } = null!;
        public virtual Usuario? UsuarioModificiacion { get; set; }
        public virtual ICollection<SalidasInventarioDetalle> SalidasInventarioDetalles { get; set; }
    }
}
