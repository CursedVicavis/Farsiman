

using FirstPrinciples.Console.Features;
using FluentAssertions;
using FluentAssertions.Extensions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using Xunit.Sdk;

namespace PrincipeFirstTest
{
    public class UnitTest1
    {
        public static ProcesadorDeDatos _procesadorDeDatos;
        public static Calculadora _calculadora;
        public static int _int = 5;
        public UnitTest1()
        {
            _procesadorDeDatos = new ProcesadorDeDatos();
            _calculadora = new Calculadora();
        }
        [Fact]
        public void TesteoTiempo()
        {
            _procesadorDeDatos.ExecutionTimeOf(s => s.ProcesarTransaccion()).Should().BeLessThanOrEqualTo(2000.Milliseconds());
        }
        [Fact]
        public void TesteoSumaDependiente()
        {
            _int = _calculadora.Sumar(3, _int);
            _int.Should().Be(8);
        }
        [Fact]
        public void TesteoRestaDependiente()
        {
            _int = _calculadora.Restar(_int, 2);
            _int.Should().Be(6);
        }
        [Fact]
        public void TesteoIndependiente()
        {
            int numero = 5;
            var calculadora = new Calculadora();
            var resultado = calculadora.Multiplicar(2, numero);
            resultado.Should().Be(10);
        }
        [Fact]
        public void TesteoRepetible()
        {
            var conversor = Substitute.For<ConversorDeMoneda>();

            var cantidad = 100;
            var monedaOrigen = "USD";
            var monedaDestino = "HNL";

            conversor.Convertir(Arg.Any<decimal>(), Arg.Any<string>(), Arg.Any<string>()).Returns(20);

            var respuesta = conversor.Convertir(cantidad, monedaOrigen, monedaDestino);

            Assert.Equal(20, respuesta);
            respuesta.Should().Be(20);
        }
        [Fact]
        public void TesteoValorIncorrecto()
        {
            Action act = () => _calculadora.Dividir(5, 0);
            act.Should().Throw<DivideByZeroException>();
            
        }   
    }
}