using AutoMapper;
using Farsiman.API.Modelos;
using Farsiman.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Farsiman.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : Controller
    {
        private readonly ServiceFarsiman _Services;
        private readonly IMapper _mapper;
        public SucursalesController(ServiceFarsiman accesoService, IMapper mapper)
        {
            _Services = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _Services.ListarSucursale();
            listado.Data = _mapper.Map<IEnumerable<SucursaleViewModel>>(listado.Data);
            return Ok(listado);
        }
  
    }
}
