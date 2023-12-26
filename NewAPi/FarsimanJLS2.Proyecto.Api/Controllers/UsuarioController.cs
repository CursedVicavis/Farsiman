using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly SeguridadService _usuariosService;

        public UsuarioController(SeguridadService UsuariosService)
        {
            _usuariosService = UsuariosService;
        }
        [HttpGet("Listar")]
        public IActionResult listarUsuarios()
        {
            Respuesta<List<UsuariosDto>> resultado = _usuariosService.ListarTransportista();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarUsuarios(UsuariosDto usuario)
        {
            var resultado = _usuariosService.Insertarusuarios(usuario);
            return Ok(resultado);
        }
    }
}
