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

        public Respuesta<List<UsuariosDto>> ListarTransportista()
        {
            var usuarios = (from usuario in _unitOfWork.Repository<Usuario>().AsQueryable()
                            select new UsuariosDto
                            {
                                IdUsuario = usuario.IdUsuario,
                                Nombre = usuario.Nombre,
                                EsAdmin = usuario.EsAdmin,
                                IdPermiso = usuario.IdPermiso,
                                Activo = usuario.Activo
                            }).ToList();
            return Respuesta.Success<List<UsuariosDto>>(usuarios, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<UsuariosDto> Insertarusuarios(UsuariosDto usuarios)
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
                return Respuesta.Fault<UsuariosDto>(menssageValidation, Codigos_Globales.BadRequest);
            }
            */
            _unitOfWork.Repository<Usuario>().Add(usuarioMapeado);
            _unitOfWork.SaveChanges();


            usuarios.IdUsuario = usuarioMapeado.IdUsuario;

            return Respuesta.Success(usuarios, Mensajes_Globales.Agregado, Codigos_Globales.Success);

        }
    }
}
