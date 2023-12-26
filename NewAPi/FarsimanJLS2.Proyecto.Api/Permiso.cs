using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class Permiso
    {
        public Permiso()
        {
            PerfilesPorPermisos = new HashSet<PerfilesPorPermiso>();
            Usuarios = new HashSet<Usuario>();
        }

        public int IdPermiso { get; set; }
        public string Nombre { get; set; } = null!;
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }

        public virtual ICollection<PerfilesPorPermiso> PerfilesPorPermisos { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
