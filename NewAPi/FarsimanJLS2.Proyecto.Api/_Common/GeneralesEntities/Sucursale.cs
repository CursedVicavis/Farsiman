using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class Sucursale
    {
        public Sucursale()
        {
            SalidasInventarios = new HashSet<SalidasInventario>();
        }

        public int IdSucursal { get; set; }
        public string Nombre { get; set; } = null!;
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }

        public virtual Usuario UsuarioCreacion { get; set; } = null!;
        public virtual Usuario? UsuarioModificiacion { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarios { get; set; }
    }
}
