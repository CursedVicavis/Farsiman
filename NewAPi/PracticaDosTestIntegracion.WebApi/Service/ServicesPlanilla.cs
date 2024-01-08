using Microsoft.Extensions.Diagnostics.HealthChecks;
using PracticaDosTestIntegracion.WebApi.Dto;

namespace PracticaDosTestIntegracion.WebApi.Service
{
    public class ServicesPlanilla
    {
        private readonly ServiceDomain _serviceDomain;
        public ServicesPlanilla()
        {
            _serviceDomain = new ServiceDomain();
        }
        public PlanillaDeEmpleadoDto Insertar(PlanillaDeEmpleadoDto dto)
        {
            var validaciones = _serviceDomain.Validaciones(dto);
            if (!validaciones.estado)
                return dto;


            return new PlanillaDeEmpleadoDto();
        }
    }
}
