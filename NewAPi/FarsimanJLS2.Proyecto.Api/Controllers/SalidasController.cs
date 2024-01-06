using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SalidasController : Controller
    {
        private readonly SalidasService _salidasService;
        public SalidasController(SalidasService salidasService)
        {
            _salidasService = salidasService;
        }
        [HttpGet("Reporte/{IdSucursal}/{fechaInicio}/{fechaFinal}")]
        public IActionResult Listar(int IdSucursal, DateTime fechaInicio, DateTime fechaFinal)
        {
            var resultado = _salidasService.ListarSalida(IdSucursal, fechaInicio, fechaFinal);
            return Ok(resultado);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(SalidasInventarioDto registros)
        {
            var resultado = _salidasService.InsertarSalida(registros);
            return Ok(resultado);
        }
    }
}
