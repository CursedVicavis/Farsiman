﻿using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class PerfilesPorPermiso
    {
        public int IdPerfilPorPermiso { get; set; }
        public int IdPerfil { get; set; }
        public int IdPermiso { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }

        public virtual Perfile IdPerfilNavigation { get; set; } = null!;
        public virtual Permiso IdPermisoNavigation { get; set; } = null!;
    }
}
