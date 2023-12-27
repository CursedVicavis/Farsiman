﻿using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using Microsoft.AspNetCore.Mvc;

namespace FarsimanJLS2.Proyecto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly SeguridadService _UsuariosService;

        public UsuarioController(SeguridadService UsuariosService)
        {
            _UsuariosService = UsuariosService;
        }
        [HttpGet("Listar")]
        public IActionResult listarUsuarios()
        {
            Respuesta<List<UsuarioDto>> resultado = _UsuariosService.ListarTransportista();
            return Ok(resultado);
        }
        [HttpPost("Insertar")]
        public IActionResult InsertarUsuarios(UsuarioDto Usuario)
        {
            var resultado = _UsuariosService.InsertarUsuarios(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Actualizar")]
        public IActionResult ActualizarUsuarios(UsuarioDto Usuario)
        {
            var resultado = _UsuariosService.ActualizarUsuario(Usuario);
            return Ok(resultado);
        }
        [HttpPut("Desactivar")]
        public IActionResult DesactivarUsuarios(UsuarioDto Usuario)
        {
            var resultado = _UsuariosService.DesactivarUsuario(Usuario);
            return Ok(resultado);
        }
    }
}