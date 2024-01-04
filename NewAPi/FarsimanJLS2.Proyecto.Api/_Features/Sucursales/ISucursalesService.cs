using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Sucursales
{
    public interface ISucursalesService <T>
    {
        public Respuesta<List<T>> ListarSucursales();
        public Respuesta<T> InsertarSucursales(T Dto);
        public Respuesta<T> ActualizarSucursales(T Dto);
        public Respuesta<T> DesactivarSucursales(T Dto);
    }
}
