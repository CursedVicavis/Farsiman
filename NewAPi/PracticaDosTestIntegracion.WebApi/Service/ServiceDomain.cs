using PracticaDosTestIntegracion.WebApi.Dto;
using System.ComponentModel.DataAnnotations;

namespace PracticaDosTestIntegracion.WebApi.Service
{
    public class ServiceDomain
    {
        public Validaciones Validaciones(PlanillaDeEmpleadoDto dto)
        {
            Validaciones validacionCorrecta = new()
            {
                mensaje = "validacion correcta"
            };
            Validaciones ValidacionIncorrecta = new()
            {
                mensaje = "validacion Incorrecta"
            };
            if (!ValidarVacios(dto))
                return ValidacionIncorrecta;
            return validacionCorrecta;
        }
        public bool ValidarVacios(PlanillaDeEmpleadoDto dto)
        {
            if (dto.Identidad == "" || dto.HorasTrabajadas == 0 || dto.NombreDeEmpleado == "" || dto.PagoPorHora == 0)
                return false;
            return true;
        }

    }
}
