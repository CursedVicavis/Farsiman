using Crud._common.Entities;
using Crud.PersonasService;
using Crud.PersonasService.Dto;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crud
{
    public class CrudTesting
    {
        [Fact]
        public void Ansertar()
        {
            var crud = new CrudDomain();
            var fechaNacimiento = new DateTime(2005, 03, 09);
            var dto = new PersonaDto()
            {
                Nombre = "Javier",
                Apellido = "Lopez",
                FechaNacimiento = fechaNacimiento,
                Activo = true
            };
            var prueba = crud.validaciones(dto, 0);
            prueba.Ok.Should().Be(true);

        }
        public void Actualizar(PersonaDto dto)
        {
            var crud = new CrudDomain();
            var fechaNacimiento = new DateTime(2005, 03, 09);
            Persona persona = new Persona()
            {
                Nombre = "Javier",
                Apellido = "Lopez",
                FechaNacimiento = fechaNacimiento,
                Activo = true
            };
            var prueba = crud.validaciones(dto,1);
            prueba.Ok.Should().Be(false);
        }
    }
}
