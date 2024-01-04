using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Empleado
{
    public interface IEmpleadoService<T>
    {
        public Respuesta<List<T>> ListarEmpleado();
        public Respuesta<T> InsertarEmpleado(T dto);
        public Respuesta<T> ActualizarEmpleado(T dto);
        public Respuesta<T> DesactivarEmpleado(T dto);
    }
}
