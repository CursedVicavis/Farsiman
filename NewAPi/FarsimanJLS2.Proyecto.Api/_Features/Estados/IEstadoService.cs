using Farsiman.Application.Core.Standard.DTOs;

namespace FarsimanJLS2.Proyecto.Api._Features.Estado
{
    public interface IEstadoService <T>
    {
        public Respuesta<List<T>> ListarEstados();
        public Respuesta<T> InsertarEstados(T dto);
        public Respuesta<T> ActualizarEstados(T dto);
        public Respuesta<T> DesactivarEstados(T dto);
    }
}
