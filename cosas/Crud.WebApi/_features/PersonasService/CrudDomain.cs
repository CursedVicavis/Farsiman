using Crud._common;
using Crud._common.Entities;
using Crud.PersonasService.Dto;
using Farsiman.Application.Core.Standard.DTOs;

namespace Crud.PersonasService
{
    public class CrudDomain
    {
        public Respuesta<bool> validaciones(PersonaDto dto,int funcion)
        {
            if (funcion == 1 && dto.Id == 0)
            {
                return Respuesta.Fault<bool>();
            }
            if (dto.Nombre == null)
            {
                return respuesta;
            }

            return respuesta;
        }
    }
}