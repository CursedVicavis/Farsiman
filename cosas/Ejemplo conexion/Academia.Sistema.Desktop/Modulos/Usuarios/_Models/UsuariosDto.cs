using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Modulos.Usuarios._Models
{
    internal class UsuariosDto
    {
        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
        public bool? EsAdmin { get; set; }
        public int? IdRol { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Estado { get; set; }
    }
}
