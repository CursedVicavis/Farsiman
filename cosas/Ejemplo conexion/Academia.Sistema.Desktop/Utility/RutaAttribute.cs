namespace Academia.Sistema.Desktop.Utility
{
    public class RutaAttribute : Attribute
    {
        /// <summary>
        /// Guarda el valor del enum
        /// </summary>
        public string Ruta { get; set; }

        /// <summary>
        /// Constructor para inicializar el valor de la ruta.
        /// </summary>
        /// <param name="value"></param>
        public RutaAttribute(string value)
        {
            this.Ruta = value;
        }
    }
}
