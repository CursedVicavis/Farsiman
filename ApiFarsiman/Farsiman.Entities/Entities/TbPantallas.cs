﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Farsiman.Entities.Entities
{
    public partial class tbPantallas
    {
        public tbPantallas()
        {
            tbRolesXPantallas = new HashSet<tbRolesXPantallas>();
        }

        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_URL { get; set; }
        public string pant_Esquema { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public bool? usua_Estado { get; set; }

        public virtual tbUsuarios usua_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbRolesXPantallas> tbRolesXPantallas { get; set; }
    }
}