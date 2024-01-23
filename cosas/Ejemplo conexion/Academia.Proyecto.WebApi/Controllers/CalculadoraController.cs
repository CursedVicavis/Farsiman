using Academia.Proyecto.WebApi._Features.Calculadora;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculadoraController : ControllerBase
    {
        public readonly CalculadoraService _calculadoraService;
        public CalculadoraController(CalculadoraService calculadoraService) 
        { 
            _calculadoraService = calculadoraService;
        }

        [HttpPost("Operaciones")]
        public IActionResult Operaciones(string numero1, string numero2)
        {
            var suma            = _calculadoraService.Suma(int.Parse(numero1), int.Parse(numero2));
            var resta           = _calculadoraService.Resta(int.Parse(numero1), int.Parse(numero2));
            var multiplicacion  = _calculadoraService.Multiplicacion(int.Parse(numero1), int.Parse(numero2));
            var division        = _calculadoraService.Division(int.Parse(numero1), int.Parse(numero2));

            return Ok($"{suma}\n{resta}\n{multiplicacion}\n{division} ");
        }
    }
}
