﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Farsiman.Entities.Entities
{
    public partial class tbSucursale
    {
        public tbSucursale()
        {
            tbSalidas = new HashSet<tbSalidas>();
        }

        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }

        public virtual ICollection<tbSalidas> tbSalidas { get; set; }
    }
}