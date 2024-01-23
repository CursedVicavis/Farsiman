using Academia.Proyecto.WebApi._Features.Empresas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmpresaController : ControllerBase
    {
        private readonly EmpresaService _service;

        public EmpresaController(EmpresaService service)
        {
            _service = service;
        }

        [HttpGet("ObtenerEmpresas")]
        public IActionResult Index()
        {
            var empresas = _service.ObtenerEmpresas();
            return Ok(empresas);
        }
    }
}
