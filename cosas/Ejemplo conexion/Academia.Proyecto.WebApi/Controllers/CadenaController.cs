using Academia.Proyecto.WebApi._Features.CadenaTexto;
using Academia.Proyecto.WebApi._Features.Calculadora;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Academia.Proyecto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadenaController : ControllerBase
    {
        public readonly CadenaTextoService _cadenaTextoService;
        public CadenaController(CadenaTextoService cadenaTextoService)
        {
            _cadenaTextoService = cadenaTextoService;
        }

        [HttpPost("OperacionesCadena")]
        public IActionResult OperacionesCadena(string cadena)
        {
            var cadenaLimpia    = _cadenaTextoService.QuitarEspacios(cadena);
            var cadenaRevez     = _cadenaTextoService.VoltearCadena(cadenaLimpia);
            var primerPalabra   = _cadenaTextoService.PrimerPalabra(cadenaLimpia);
            var ultimaPalabra   = _cadenaTextoService.UltimaPalabra(cadenaLimpia);

            return Ok($"Cadena Limpia: {cadenaLimpia}\n" +
                      $"Cadena al Revez: {cadenaRevez}\n" +
                      $"Primer Palabra: {primerPalabra}\n" +
                      $"Ultima Palabra: {ultimaPalabra} ");
        }
    }
}
