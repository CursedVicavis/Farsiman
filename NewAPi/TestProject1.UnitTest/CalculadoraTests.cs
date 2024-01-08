using EjemploPruebaUnitaria.Pruebas;

namespace TestProject1.UnitTest
{
    public class CalculadoraTests
    {
        private Calculadora _calculadora;
        public CalculadoraTests()
        {
            _calculadora = new Calculadora();
        }

        [Fact]
        public void Test1()
        {
            int num1 = 3; int num2 = 5;
            int result = _calculadora.sumar(num1, num2);
            Assert.Equal(8, result);
        }
        [Fact]  
        public void Test2()
        {
            int result = _calculadora.restar(5, 3);
            Assert.Equal(2, result);
        }
        [Fact]
        public void Test3()
        {
            int result = _calculadora.multiplicar(3, 5);
            Assert.Equal(15, result);
        }
        [Fact]
        public void test4()
        {
            var result = _calculadora.dividir(6, 2);
            Assert.Equal(3, result);
        }
        [Fact]
        public void test5()
        {
            Assert.Throws<System.DivideByZeroException>(() => _calculadora.dividir(5, 0));
        }
       
    }

    public class ConverterTest
    {
        private CurrencyConverter _currencyConverter;
        public ConverterTest()
        {
            _currencyConverter = new CurrencyConverter();

        }
        [Fact]
        public void lempirasADolarTest()
        {
            var result = _currencyConverter.LempirasADolar(321.36);
            Assert.Equal(13, result);
        }
        [Fact]
        public void lempirasADolarTestZero()
        {
            Assert.Throws<ArgumentException>(() => _currencyConverter.LempirasADolar(0));
        }
        [Fact]
        public void lempirasADolarTestFake()
        {
            var result = _currencyConverter.LempirasADolar(231);
            Assert.NotEqual(1, result);
        }
    }
    public class Formulario 
    {

    }
    public class PasswordVerifierTest
    {
        private PasswordVerifier _passwordVerifier;
¿        public PasswordVerifierTest()
        {
            _passwordVerifier = new PasswordVerifier();
        }
        [Fact]
        public void PasswordVaciaTest()
        {
            string contrasena = "";
            var result = _passwordVerifier.ValidarContrasena(contrasena);
            Assert.Equal("La contraseña no puede estar vacia", result.mensaje);
            Assert.False(result.estado);
        }
        [Fact]
        public void PasswordCaracteresPocosTest()
        {
            string contrasena = "aaaaaaa";
            var result = _passwordVerifier.ValidarContrasena(contrasena);
            Assert.Equal("La contraseña no puede ser menor que 8 caracteres", result.mensaje);
            Assert.False(result.estado);
        }
        [Fact]
        public void PasswordIncluyeNumeroTest()
        {
            string contrasena = "aaaaaaaa";
            var result = _passwordVerifier.ValidarContrasena(contrasena);
            Assert.Equal("La contraseña debe tener almenos 1 numero", result.mensaje);
            Assert.False(result.estado);
        }
        [Fact]
        public void PasswordIncluyeMayusculaTest()
        {
            string contrasena = "aaaaaaa1";
            var result = _passwordVerifier.ValidarContrasena(contrasena);
            Assert.Equal("La contraseña debe tener una mayuscula", result.mensaje);
            Assert.False(result.estado);
        }
    }
}