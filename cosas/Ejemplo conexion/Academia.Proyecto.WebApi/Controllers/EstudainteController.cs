using Academia.Proyecto.WebApi._Features.Agrupaciones.Entities;
using Academia.Proyecto.WebApi._Features.Agrupaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Academia.Proyecto.WebApi._Features.Estudiantes;
using Academia.Proyecto.WebApi._Features.Estudiantes.Entities;

namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudainteController : ControllerBase
    {
        public readonly EstidianteService _estidianteService;
        public EstudainteController(EstidianteService estidianteService)
        {
            _estidianteService = estidianteService;
        }

        [HttpPost("DatosEstudiantes")]
        public IActionResult AgrupacionPersonas(List<Estudiante> estudiantes, string nombre)
        {
            var resultado = _estidianteService.BuscarEstudiantes(estudiantes, nombre);
            return Ok(resultado);
        }
    }
}
