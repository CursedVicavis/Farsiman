namespace EjemploPruebaUnitaria.Pruebas
{
    public class Calculadora
    {
        public int sumar(int num1, int num2)
        {
            return num1 + num2;
        }
        public int restar(int num1, int num2)
        {
            return num1 - num2;
        }
        public int multiplicar(int num1, int num2)
        {
            return num1 * num2;
        }
        public double dividir(int num1, int num2)
        {
            if (num2 == 0)
            {
                throw new System.DivideByZeroException("no se puede divir entre cero");
            }
            return (double)num1 / num2;
        }
    }
}
