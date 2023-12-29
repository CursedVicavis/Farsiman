using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;

namespace FarsimanJLS2.Proyecto.Api._Features.Sucursales
{
    public class SucursalesService
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;
        public SucursalesService(IMapper mapper, UnitOfWorkBuilder unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
        }
        public Respuesta<List<SucursaleDto>> ListarSucursales()
        {
            var usuarios = (from usuario in _unitOfWork.Repository<Usuario>().AsQueryable()
                            select new SucursaleDto
                            {
                                IdSucursal = usuario.IdUsuario,
                                Nombre = usuario.Nombre,
                                Activo = usuario.Activo
                            }).ToList();
            return Respuesta.Success<List<SucursaleDto>>(usuarios, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<SucursaleDto> InsertarSucursal(SucursaleDto sucursaleDto)
        {
            var sucursalMapeado = _mapper.Map<Sucursale>(sucursaleDto);
            sucursalMapeado.UsuarioModificiacionId = null;
            sucursalMapeado.FechaModificacion = null;

            _unitOfWork.Repository<Sucursale>().Add(sucursalMapeado);
            _unitOfWork.SaveChanges();

            sucursaleDto.IdSucursal = sucursalMapeado.IdSucursal;


            return Respuesta.Success<SucursaleDto>(sucursaleDto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<SucursaleDto> ActualizarSucursal(SucursaleDto sucursaleDto)
        {
            if (sucursaleDto.IdSucursal <= 0)
                return Respuesta.Success(sucursaleDto, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            var sucursalMapeado = _unitOfWork.Repository<Sucursale>().FirstOrDefault(x => x.IdSucursal == sucursaleDto.IdSucursal);

            if (sucursalMapeado == null)
                return Respuesta.Success(sucursaleDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                sucursalMapeado.IdSucursal = sucursaleDto.IdSucursal;
                sucursalMapeado.Nombre = sucursaleDto.Nombre;
                sucursalMapeado.UsuarioModificiacionId = sucursaleDto.UsuarioModificiacionId;
                sucursalMapeado.FechaModificacion = sucursaleDto.FechaModificacion;
                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success<SucursaleDto>(sucursaleDto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<SucursaleDto> DesactivarSucursal(SucursaleDto sucursaleDto)
        {
            if (sucursaleDto.IdSucursal <= 0)
                return Respuesta.Success(sucursaleDto, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            var sucursalMapeado = _unitOfWork.Repository<Sucursale>().FirstOrDefault(x => x.IdSucursal == sucursaleDto.IdSucursal);

            if (sucursalMapeado == null)
                return Respuesta.Success(sucursaleDto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                sucursalMapeado.Activo = false;
                sucursalMapeado.UsuarioModificiacionId = sucursaleDto.UsuarioModificiacionId;
                sucursalMapeado.FechaModificacion = sucursaleDto.FechaModificacion;
                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success<SucursaleDto>(sucursaleDto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
    }
}
