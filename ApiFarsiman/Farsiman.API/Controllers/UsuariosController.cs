using AutoMapper;
using Farsiman.API.Modelos;
using Farsiman.BusinessLogic.Services;
using Farsiman.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Farsiman.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : Controller
    {
        private readonly ServiceFarsiman _Services;
        private readonly IMapper _mapper;

        public UsuariosController(ServiceFarsiman accesoService, IMapper mapper)
        {
            _Services = accesoService;
            _mapper = mapper;
        }
        [HttpPost("Login")]
        public IActionResult InicioSesion(UsuariosViewModel usuarios)
        {
            var mapped = _mapper.Map<tbUsuarios>(usuarios);
            var respuesta = _Services.IniciarSesion(mapped);

            if (respuesta.Code == 200)
            {
                respuesta.Data = _mapper.Map<UsuariosViewModel>(respuesta.Data);

                return Ok(respuesta);

            }
            else
            {
                return StatusCode(203, respuesta);
            }
        }

        [HttpPost("RolesPorPantalla")]
        public IActionResult ValidarLogin(RolesXPantallasViewModel item)
        {
            var item2 = _mapper.Map<tbRolesXPantallas>(item);
            var response = _Services.Pantallas_Por_Rol(item2);
            return Ok(response);
        }
        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _Services.ListarUsuarios();
            listado.Data = _mapper.Map<IEnumerable<UsuariosViewModel>>(listado.Data);
            return Ok(listado);

        }
    }
}
