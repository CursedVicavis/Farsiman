using AutoMapper;
using Farsiman.API.Modelos;
using Farsiman.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Farsiman.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : Controller
    {
        private readonly ServiceFarsiman _Services;
        private readonly IMapper _mapper;
        public ProductosController(ServiceFarsiman accesoService, IMapper mapper)
        {
            _Services = accesoService;
            _mapper = mapper;
        }

        [HttpGet("ListarDDL")]
        public IActionResult Index()
        {
            var listado = _Services.ListarProdcutosDDL();
            listado.Data = _mapper.Map<IEnumerable<ProductosViewModel>>(listado.Data);
            return Ok(listado);
        }
     
    }
}
