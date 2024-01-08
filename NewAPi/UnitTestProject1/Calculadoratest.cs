using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject1
{
    internal class Calculadoratest
    {
        private Calculadora _calculadora;
        public Calculadoratest(Calculadora calculadora)
        {
            _calculadora = calculadora;
        }
        [Fact]
        public void Add_ShouldReturnSum()
        {
            int result = _calculadora.Sum(3, 5);
            Assert.Equals(8, result);
        }
    }
}
