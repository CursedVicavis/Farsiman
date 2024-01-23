using Academia.Proyecto.WebApi._Features.Empresas;
using Academia.Proyecto.WebApi._Features.Sucursales;
using Academia.Proyecto.WebApi._Features.Sucursales.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/Sucursal")]
    [ApiController]
    public class SucursalController : ControllerBase
    {
        private readonly SucursalService _service;

        public SucursalController(SucursalService service)
        {
            _service = service;
        }

        [HttpGet("ObtenerSucursales")]
        public IActionResult ObtenerSucursales()
        {
            var resultado = _service.ObtenerSucursales();
            return Ok(resultado);
        }

        [HttpPost("AgregarSucursal")]
        public IActionResult ObtenerSucursales([FromBody] Sucursal sucursal)
        {
            var resultado = _service.AgregarSucursal(sucursal);
            return Ok(resultado);
        }
    }
}
