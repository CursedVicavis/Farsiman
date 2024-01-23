using System.Text.RegularExpressions;

namespace GeneradorDeSaludos.Domain
{
    public class Saludos
    {
        public Saludos()
        {
        }
        public string Saludar(string? nombre, DateTime hora)
        {
            if (nombre == null)
            {
                return "Hola Mundo";
            }
            if (nombre == "Director")
            {
                return $"¿Como esta hoy {nombre}?";
            }
            string contiene = @"[a-z]";
            string contieneMayus = @"[A-Z]";
            if (!Regex.IsMatch(nombre,contiene) && !Regex.IsMatch(nombre, contieneMayus))
            {
                return "Nombre Invalido";
            }
            if (hora.Hour >= 23 || hora.Hour <= 0)
            {
                return "Hora Invalida";
            }
            if (hora.Hour < 12)
            {
                return $"Buenos Dias {nombre}";
            }
            if (hora.Hour > 12 && hora.Hour <= 18)
            {
                return $"Buenas Tardes {nombre}";
            }
            if (hora.Hour > 18)
            {
                return $"Buenas Noches {nombre}";
            }
            return "Hola mundo";
        }
    }
}