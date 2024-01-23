namespace Academia.Proyecto.WebApi._Features.CadenaTexto
{
    public class CadenaTextoService
    {

        public CadenaTextoService()
        {
          
        }

        public string QuitarEspacios(string cadena)
        {
            string? cadenaLimpia = string.Empty;

            if (cadena != null)
            {
                for (int i = 0; i < cadena.Length; i++)
                {
                    if (i + 1 == cadena.Length && cadena[i] == ' ') break;
                    if (cadena[i] == ' ' && cadena[i + 1] == ' ') { }
                    else cadenaLimpia += cadena[i];
                }
            }
                
            return cadenaLimpia;
        }

        public string VoltearCadena(string cadena)
        {
            string? cadenaRevez = string.Empty;

            for (int i = cadena.Length; i> 0; i--)
            {
                cadenaRevez += cadena[i - 1];
            }

            return cadenaRevez;
        }

        public string PrimerPalabra(string cadena)
        {
            string? primerPalabra = string.Empty;

            for (int i = 0; i < cadena.Length; i++)
            {
                if (cadena[i] == ' ') break;
                else primerPalabra += cadena[i].ToString().ToUpper();
            }

            return primerPalabra;
        }

        public string UltimaPalabra(string cadena)
        {
            string? ultimaPalabra = string.Empty;

            for (int i = cadena.Length; i> 0; i--)
            {
                if (cadena[i - 1] == ' ') break;
                ultimaPalabra += cadena[i -1].ToString().ToUpper();
            }

            return ultimaPalabra;
        }
    }
}

