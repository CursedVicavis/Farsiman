using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;
using System.Data;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SeguridadService : IUsuariosService<UsuarioDto, UsuariosViewDto>
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;
        private readonly SeguridadDomain _seguridadDomain;

        public SeguridadService(IMapper mapper, UnitOfWorkBuilder unitOfWork, SeguridadDomain seguridadDomain)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
            _seguridadDomain = seguridadDomain;
        }

        public Respuesta<List<UsuariosViewDto>> ListarUsuarios()
        {
            var usuarios = (from usuario in _unitOfWork.Repository<Usuario>().AsQueryable()
                            join perfil in _unitOfWork.Repository<Perfile>().AsQueryable()
                            on usuario.IdPerfil equals perfil.IdPerfil
                            select new UsuariosViewDto
                            {
                                IdUsuario = usuario.IdUsuario,
                                Nombre = usuario.Nombre,
                                EsAdmin = usuario.EsAdmin,
                                IdPerfil = usuario.IdPerfil,
                                NombrePerfil = perfil.Nombre,
                                Activo = usuario.Activo
                            }).ToList();
            return Respuesta.Success<List<UsuariosViewDto>>(usuarios, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<UsuarioDto> InsertarUsuarios(UsuarioDto usuariosDto)
        {

            var usuarioMapeado = _mapper.Map<Usuario>(usuariosDto);
            usuarioMapeado.UsuarioModificiacionId = null;
            usuarioMapeado.FechaModificacion = null;

            if (!_seguridadDomain.VaciosValidadUsuarios(usuariosDto))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.Vacio, Codigos_Globales.BadRequest);

            if (_seguridadDomain.ValidarRolExiste(usuariosDto.IdPerfil, _unitOfWork.Repository<Perfile>().AsQueryable().ToList()))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);

            if (_seguridadDomain.ValidarUsuarioExiste(usuariosDto, _unitOfWork.Repository<Usuario>().AsQueryable().ToList()))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroRepetido, Codigos_Globales.BadRequest);

            /*
            UsuariosValidator validator = new UsuariosValidator();

            ValidationResult validationResult = validator.Validate(usuarioMapeado);
            if (!validationResult.IsValid)
            {
                IEnumerable<string> errores = validationResult.Errors.Select(s => s.ErrorMessage);
                string menssageValidation = string.Join(Environment.NewLine, errores);
                return Respuesta.Fault<UsuarioDto>(menssageValidation, Codigos_Globales.BadRequest);
            }
            */
            _unitOfWork.Repository<Usuario>().Add(usuarioMapeado);
            _unitOfWork.SaveChanges();

            usuariosDto.IdUsuario = usuarioMapeado.IdUsuario;

            return Respuesta.Success(usuariosDto, Mensajes_Globales.Agregado, Codigos_Globales.Success);
        }

        public Respuesta<UsuarioDto> ActualizarUsuarios(UsuarioDto usuariosDto)
        {
            if (usuariosDto.IdUsuario <= 0)
                return Respuesta.Success(usuariosDto, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            if (!_seguridadDomain.VaciosValidadUsuarios(usuariosDto))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.Vacio, Codigos_Globales.BadRequest);

            if (_seguridadDomain.ValidarRolExiste(usuariosDto.IdPerfil, _unitOfWork.Repository<Perfile>().AsQueryable().ToList()))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);

            if (_seguridadDomain.ValidarUsuarioExiste(usuariosDto, _unitOfWork.Repository<Usuario>().AsQueryable().ToList()))
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroRepetido, Codigos_Globales.BadRequest);

            Usuario? usuarioMapeado = _unitOfWork.Repository<Usuario>().FirstOrDefault(x => x.IdUsuario == usuariosDto.IdUsuario);
            //UsuariosValidator validator = new UsuariosValidator();

            if (usuarioMapeado == null)
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {

                //ValidationResult validationResult = validator.Validate(usuarioMapeado);
               /* if (!validationResult.IsValid)
                {
                    IEnumerable<string> errores = validationResult.Errors.Select(s => s.ErrorMessage);
                    string menssageValidation = string.Join(Environment.NewLine, errores);
                    return Respuesta.Success(usuarios, menssageValidation, Codigos_Globales.BadRequest);
                }*/

                usuarioMapeado.IdUsuario = usuariosDto.IdUsuario;
                usuarioMapeado.Nombre = usuariosDto.Nombre;
                usuarioMapeado.Contrasena = usuariosDto.Contrasena;
                usuarioMapeado.EsAdmin = usuariosDto.EsAdmin;
                usuarioMapeado.IdPerfil = usuariosDto.IdPerfil;
                usuarioMapeado.UsuarioModificiacionId = usuariosDto.UsuarioModificiacionId;
                usuarioMapeado.FechaModificacion = usuariosDto.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            usuariosDto.IdUsuario = usuarioMapeado.IdUsuario;

            return Respuesta.Success(usuariosDto, Mensajes_Globales.Editado, Codigos_Globales.Success);
        }

        public Respuesta<UsuarioDto> DesactivarUsuarios(UsuarioDto usuariosDto)
        {
            if (usuariosDto.IdUsuario <= 0)
                return Mensajes_Globales.IdVacio;

            Usuario? usuarioMapeado = _unitOfWork.Repository<Usuario>().FirstOrDefault(x => x.IdUsuario == usuariosDto.IdUsuario);


            if (usuarioMapeado == null)
                return Respuesta.Success(usuariosDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                usuarioMapeado.Activo = false;
                usuarioMapeado.UsuarioModificiacionId = usuariosDto.UsuarioModificiacionId;
                usuarioMapeado.FechaModificacion = usuariosDto.FechaModificacion;

                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success(usuariosDto, Mensajes_Globales.Editado, Codigos_Globales.Success);
        }
    }
}
