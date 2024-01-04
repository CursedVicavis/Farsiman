using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Empleado.EmpleadoDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Empleado
{
    public class EmpleadoService : IEmpleadoService<EmpleadosDto>
    {
        public Respuesta<EmpleadosDto> ActualizarEmpleado(EmpleadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<EmpleadosDto> DesactivarEmpleado(EmpleadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<EmpleadosDto> InsertarEmpleado(EmpleadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<List<EmpleadosDto>> ListarEmpleado()
        {
            throw new NotImplementedException();
        }
    }
}
