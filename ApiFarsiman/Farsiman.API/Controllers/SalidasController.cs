using AutoMapper;
using Farsiman.API.Modelos;
using Farsiman.BusinessLogic.Services;
using Farsiman.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Index.HPRtree;

namespace Farsiman.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalidasController : Controller
    {
        private readonly ServiceFarsiman _Services;
        private readonly IMapper _mapper;
        public SalidasController(ServiceFarsiman accesoService, IMapper mapper)
        {
            _Services = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listar")]
        public IActionResult Index()
        {
            var listado = _Services.ListarSalidas();
            listado.Data = _mapper.Map<IEnumerable<SalidasViewModel>>(listado.Data);
            return Ok(listado);
        }
        [HttpGet("ListarDetalles")]
        public IActionResult IndexDetalles(int sali_Id)
        {
            var listado = _Services.ListarSalidasDetalles(sali_Id);
            listado.Data = _mapper.Map<IEnumerable<SalidasDetallesViewModel>>(listado.Data);
            return Ok(listado);
        }
        [HttpGet("StockRevision")]
        public IActionResult revisiondestock(int cantidad, string prod_Descripcion)
        {
            var listado = _Services.RevisionStock(cantidad, prod_Descripcion);
            listado.Data = _mapper.Map<IEnumerable<SalidasViewModel>>(listado.Data);
            return Ok(listado);
        }
        [HttpPost("Insertar")]
        public IActionResult insert(SalidasViewModel item)
        {
            var mapped = _mapper.Map<tbSalidas>(item);
            var datos = _Services.InsertarSalida(mapped);
            return Ok(datos);
        }
        [HttpPost("InsertarDetalle")]
        public IActionResult insertdetalle(SalidasDetallesViewModel item)
        {
            var mapped = _mapper.Map<tbSalidasDetalles>(item);
            var datos = _Services.InsertarSalidaDetalles(mapped);
            return Ok(datos);
        }
        [HttpPut("AceptarSalida")]
        public IActionResult aceptarSalida(SalidasViewModel item)
        {
            var mapped = _mapper.Map<tbSalidas>(item);
            var datos = _Services.AceptarSalida(mapped);
            return Ok(datos);
        }
        [HttpGet("ListadoFiltrado")]
        public IActionResult ListFiltrado(string fechaInicio, string FechaFinal, int Sucursal)
        {
            var listado = _Services.ListarSalidasFiltrado(fechaInicio, FechaFinal, Sucursal);
            listado.Data = _mapper.Map<IEnumerable<SalidasViewModel>>(listado.Data);
            return Ok(listado);
        }
    }
}
