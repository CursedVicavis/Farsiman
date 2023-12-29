using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : Controller
    {
        private readonly SucursalesService _sucursaleService;
        public SucursalesController(SucursalesService sucursalesService)
        {
            _sucursaleService = sucursalesService;
        }
        [HttpGet("Listar")]
        public IActionResult ListarSucursale()
        {
            var resultado = _sucursaleService.ListarSucursales();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarSucursal(SucursaleDto Usuario)
        {
            var resultado = _sucursaleService.InsertarSucursal(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Actualizar")]
        public IActionResult ActualizarSucursal(SucursaleDto Usuario)
        {
            var resultado = _sucursaleService.ActualizarSucursal(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Desactivar")]
        public IActionResult DesactivarSucursal(SucursaleDto Usuario)
        {
            var resultado = _sucursaleService.DesactivarSucursal(Usuario);
            return Ok(resultado);
        }
    }
}
