 using System.Text.RegularExpressions;

namespace EjemploPruebaUnitaria.Pruebas
{
    public class PasswordVerifier
    {
        public Validaciones ValidarContrasena(string contrasena)
        {
            var respuesta = new Validaciones();
            if (contrasena == "" || contrasena == null)
            {
                respuesta.mensaje = "La contraseña no puede estar vacia";
                respuesta.estado = false;
                return respuesta;
            }
            if (contrasena.Length <= 7)
            {
                respuesta.mensaje = "La contraseña no puede ser menor que 8 caracteres";
                respuesta.estado = false;
                return respuesta;
            }
            if (!Patron(contrasena, 1))
            {
                respuesta.mensaje = "La contraseña debe tener almenos 1 numero";
                respuesta.estado = false;
                return respuesta;
            }
            if (!Patron(contrasena, 2))
            {
                respuesta.mensaje = "La contraseña debe tener una mayuscula";
                respuesta.estado = false;
                return respuesta;
            }
            if (!Patron(contrasena, 3))
            {
                respuesta.mensaje = "La contraseña deber tener 1 caracter especial";
                respuesta.estado = false;
                return respuesta;
            }
            else
            {
                respuesta.mensaje = "Contraseña Valida";
                respuesta.estado = true;
                return respuesta;
            }
        }

        public bool Patron(string cadena, int funcion)
        {
            //Buscar numero 
            if (funcion == 1)
            {
                string patron = @"\d";

                return Regex.IsMatch(cadena, patron);
            }
            //Buscar Mayusucla 
            if (funcion == 2)
            {
                string patron = @"[A-Z]";

                return Regex.IsMatch(cadena, patron);
            }
            //Buscar CaracterEspecial
            if (funcion == 3)
            {
                string patron = @"[!@#$%^&*(),.?':{}|<>]";

                return Regex.IsMatch(cadena, patron);
            }
            return false;
        }
    }
}
