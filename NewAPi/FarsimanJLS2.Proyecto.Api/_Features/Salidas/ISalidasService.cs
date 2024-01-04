using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Salidas
{
    public interface ISalidasService <T,V>
    {
        public Respuesta<List<V>> ListarSalida();
        public Respuesta<T> InsertarSalida(T dto);
        public Respuesta<T> DesactivarSalida(T dto);
    }
}
