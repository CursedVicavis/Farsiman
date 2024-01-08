namespace EjemploPruebaUnitaria.Pruebas
{
    public class CurrencyConverter
    {
        public double LempirasADolar(double lempiras)
        {
            if (lempiras <= 0 )
            {
                throw new ArgumentException("la convercion no puede ser negativa");
            }
            var a = lempiras *0.040;
            return Math.Round(a);
        }
    }
}
