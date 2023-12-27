using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SeguridadService
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public SeguridadService(IMapper mapper, UnitOfWorkBuilder unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
        }

        public Respuesta<List<UsuarioDto>> ListarTransportista()
        {
            var usuarios = (from usuario in _unitOfWork.Repository<Usuario>().AsQueryable()
                            select new UsuarioDto
                            {
                                IdUsuario = usuario.IdUsuario,
                                Nombre = usuario.Nombre,
                                EsAdmin = usuario.EsAdmin,
                                IdPermiso = usuario.IdPermiso,
                                Activo = usuario.Activo
                            }).ToList();
            return Respuesta.Success<List<UsuarioDto>>(usuarios, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<UsuarioDto> InsertarUsuarios(UsuarioDto usuarios)
        {

            var usuarioMapeado = _mapper.Map<Usuario>(usuarios);
            usuarioMapeado.UsuarioModificiacionId = null;
            usuarioMapeado.FechaModificacion = null;
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


            usuarios.IdUsuario = usuarioMapeado.IdUsuario;

            return Respuesta.Success(usuarios, Mensajes_Globales.Agregado, Codigos_Globales.Success);

        }

        public Respuesta<UsuarioDto> ActualizarUsuario(UsuarioDto usuarios)
        {
            if (usuarios.IdUsuario <= 0)
                return Respuesta.Success(usuarios, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            Usuario? usuarioMapeado = _unitOfWork.Repository<Usuario>().FirstOrDefault(x => x.IdUsuario == usuarios.IdUsuario);
            //UsuariosValidator validator = new UsuariosValidator();

            if (usuarioMapeado == null)
            {
                return Respuesta.Success(usuarios, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            }
            else
            {

                //ValidationResult validationResult = validator.Validate(usuarioMapeado);
               /* if (!validationResult.IsValid)
                {
                    IEnumerable<string> errores = validationResult.Errors.Select(s => s.ErrorMessage);
                    string menssageValidation = string.Join(Environment.NewLine, errores);
                    return Respuesta.Success(usuarios, menssageValidation, Codigos_Globales.BadRequest);
                }*/

                usuarioMapeado.IdUsuario = usuarios.IdUsuario;
                usuarioMapeado.Nombre = usuarios.Nombre;
                usuarioMapeado.Contrasena = usuarios.Contrasena;
                usuarioMapeado.EsAdmin = usuarios.EsAdmin;
                usuarioMapeado.IdPermiso = usuarios.IdPermiso;
                usuarioMapeado.UsuarioCreacionId = usuarios.UsuarioCreacionId;
                usuarioMapeado.FechaCreacion = usuarios.FechaCreacion;
                usuarioMapeado.UsuarioModificiacionId = usuarios.UsuarioModificiacionId;
                usuarioMapeado.FechaModificacion = usuarios.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            usuarios.IdUsuario = usuarioMapeado.IdUsuario;

            return Respuesta.Success(usuarios, Mensajes_Globales.Editado, Codigos_Globales.Success);
        }

        public string DesactivarUsuario(UsuarioDto usuarios)
        {
            if (usuarios.IdUsuario <= 0)
                return Mensajes_Globales.IdVacio;

            Usuario? usuarioMapeado = _unitOfWork.Repository<Usuario>().FirstOrDefault(x => x.IdUsuario == usuarios.IdUsuario);


            if (usuarioMapeado == null)
            {
                return Mensajes_Globales.RegistroInexistente;
            }
            else
            {
                usuarioMapeado.Activo = false;
                usuarioMapeado.UsuarioModificiacionId = usuarios.UsuarioModificiacionId;
                usuarioMapeado.FechaModificacion = usuarios.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            usuarios.IdUsuario = usuarioMapeado.IdUsuario;

            return Mensajes_Globales.Desactivado;
        }
    }
}
