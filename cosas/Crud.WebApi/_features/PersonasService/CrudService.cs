using Crud._common;
using Crud._common.Entities;
using Crud.PersonasService.Dto;
using Farsiman.Application.Core.Standard.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crud.PersonasService
{
    public class CrudService
    {
        private readonly CrudDomain _crudDomain;
        public CrudService()
        {
            _crudDomain = new CrudDomain();
        }
        public Respuesta<PersonaDto> Insert(PersonaDto dto)
        {
            var validacion = _crudDomain.validaciones(dto,0);
            Respuesta<PersonaDto> respuesta = new Respuesta<PersonaDto>()
            { 
                Data = dto
            };
            if (!validacion.Ok)
            {
                respuesta.Codigo = validacion.Codigo;
                respuesta.Mensaje = validacion.Mensaje;
                return respuesta;
            }
            var persona = new Persona();
                        
            return respuesta;
        }
        public void AgregarBaseDeDatos(PersonaDto dto)
        {
            Persona persona = new Persona()
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                FechaNacimiento = dto.FechaNacimiento
            };
        }
    }
}
