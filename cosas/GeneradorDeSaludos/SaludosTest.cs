using FluentAssertions;
using GeneradorDeSaludos.Domain;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeneradorDeSaludos
{
    public class SaludosTest
    {
        [Fact]
        public void SaludoGenera()
        {
            var saludos = new Saludos();
            string? nombre = null;
            DateTime hora = DateTime.UtcNow.AddHours(-6);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be("Hola Mundo");
        }
        /*
         saludo matutino*/
        [Fact]
        public void SaludoMatutino()
        {
            var saludos = new Saludos();
            string? nombre = "Javier";
            DateTime hora = new DateTime(2024, 1, 10, 6, 0, 0);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be($"Buenos Dias {nombre}");
        }
        //Saludo despertino
        [Fact]
        public void SaludoDespertino()
        {
            var saludos = new Saludos();
            string? nombre = "Javier";
            DateTime hora = new DateTime(2024, 1, 10, 18, 0, 0);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be($"Buenas Tardes {nombre}");
        }
        [Fact]
        public void SaludoNocturno()
        {
            var saludos = new Saludos();
            string? nombre = "Javier";
            DateTime hora = new DateTime(2024, 1, 10, 19, 0, 0);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be($"Buenas Noches {nombre}");
        }
        [Fact]
        public void SaludoEspecial()
        {
            var saludos = new Saludos();
            string? nombre = "Director";
            DateTime hora = new DateTime(2024, 1, 10, 19, 0, 0);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be($"¿Como esta hoy {nombre}?");
        }
        [Fact]
        public void NombreInvalido()
        {
            var saludos = new Saludos();
            string? nombre = "123";
            DateTime hora = new DateTime(2024, 1, 10, 19, 0, 0);
            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be("Nombre Invalido");
        }
        [Fact]
        public void HoraInvalida()
        { 
            var saludos = new Saludos();
            string? nombre = "Javier";
            DateTime hora = new DateTime(2024, 1, 10, 0, 0, 0);

            string respuestaSaludo = saludos.Saludar(nombre, hora);
            respuestaSaludo.Should().Be("Hora Invalida");                     
        }
    }

}
