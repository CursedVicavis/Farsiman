using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Modulos.Usuarios._Models
{
    internal class LoginDto
    {
        public string Nombre { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
    }
}
