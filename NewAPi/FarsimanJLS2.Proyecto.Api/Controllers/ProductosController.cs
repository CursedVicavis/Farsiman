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
            var resultado = _productosService.ListarUsuarios();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarUsuarios(ProductoDto Usuario)
        {
            var resultado = _productosService.InsertarUsuarios(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Actualizar")]
        public IActionResult ActualizarUsuarios(ProductoDto Usuario)
        {
            var resultado = _productosService.ActualizarUsuario(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Desactivar")]
        public IActionResult DesactivarUsuarios(ProductoDto Usuario)
        {
            var resultado = _productosService.DesactivarUsuario(Usuario);
            return Ok(resultado);
        }
    }
}
