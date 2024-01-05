using FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : Controller
    {
        private readonly ProductosService _productosService;
        public ProductosController(ProductosService productosService)
        {
            _productosService = productosService;
        }
        [HttpGet("Listar")]
        public IActionResult listarUsuarios()
        {
            var resultado = _productosService.ListarProductos();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarUsuarios(ProductoDto dto)
        {
            var resultado = _productosService.InsertarProductos(dto);
            return Ok(resultado);
        }
        [HttpPut("Actualizar")]
        public IActionResult ActualizarUsuarios(ProductoDto dto)
        {
            var resultado = _productosService.ActualizarProductos(dto);
            return Ok(resultado);
        }
        [HttpPut("Desactivar")]
        public IActionResult DesactivarUsuarios(ProductoDto dto)
        {
            var resultado = _productosService.DesactivarProductos(dto);
            return Ok(resultado);
        }
    }
}
