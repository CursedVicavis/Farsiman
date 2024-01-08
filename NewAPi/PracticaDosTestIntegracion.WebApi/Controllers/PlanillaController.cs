using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using PracticaDosTestIntegracion.WebApi.Dto;
using PracticaDosTestIntegracion.WebApi.Service;

namespace PracticaDosTestIntegracion.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanillaController : Controller
    {
        private readonly ServicesPlanilla _planillaDeEmpleadoDto;
        public PlanillaController()
        {
            _planillaDeEmpleadoDto = new ServicesPlanilla();
        }
        public IActionResult Insert(PlanillaDeEmpleadoDto dto)
        {
            var resultado = _planillaDeEmpleadoDto.Insertar(dto);
            return Ok(resultado);
        }
    }
}
