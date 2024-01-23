using Academia.Proyecto.WebApi._Features.Agrupaciones;
using Academia.Proyecto.WebApi._Features.Agrupaciones.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;
using System.Runtime.InteropServices.JavaScript;


namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgrupacionController : ControllerBase
    {
        public readonly AgrupacionService _agrupacionService;
        public AgrupacionController(AgrupacionService agrupacionService)
        {
            _agrupacionService = agrupacionService;
        }

        [HttpPost("AgrupacionPersonas")]
        public IActionResult AgrupacionPersonas(Agrupacion agrupacion)
        {
            var grupos = _agrupacionService.Agrupacion(agrupacion);
            return Ok(grupos);
        }
    }
}
