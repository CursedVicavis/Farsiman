using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Estado.EstadoDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Estado
{
    public class EstadoService : IEstadoService<EstadosDto>
    {
        public Respuesta<EstadosDto> ActualizarEstados(EstadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<EstadosDto> DesactivarEstados(EstadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<EstadosDto> InsertarEstados(EstadosDto dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<List<EstadosDto>> ListarEstados()
        {
            throw new NotImplementedException();
        }
    }
}
