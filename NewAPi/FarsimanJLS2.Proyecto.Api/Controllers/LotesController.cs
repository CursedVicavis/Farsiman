using FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotesController : Controller
    {
        private readonly ProductosLotesService _productosService;
        public LotesController(ProductosLotesService productosService)
        {
            _productosService = productosService;
        }
        [HttpGet("Listar")]
        public IActionResult listarUsuarios()
        {
            var resultado = _productosService.ListarLotes();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarUsuarios(ProductosLoteDto dto)
        {
            var resultado = _productosService.InsertarLotes(dto);
            return Ok(resultado);
        }
    }
}
