﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Farsiman.Entities.Entities
{
    public partial class tbProductos
    {
        public tbProductos()
        {
            tbLotes = new HashSet<tbLotes>();
        }

        public int prod_Id { get; set; }
        public string prod_Descripcion { get; set; }
        public decimal? prod_Precio { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbLotes> tbLotes { get; set; }
    }
}