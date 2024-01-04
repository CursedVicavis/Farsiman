using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;
using Farsiman.Application.Core.Standard.DTOs;

namespace FarsimanJLS2.Proyecto.Api._Features.Sucursales
{
    public class SucursalesService : ISucursalesService<SucursaleDto>
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
        public Respuesta<SucursaleDto> InsertarSucursal(SucursaleDto dto)
        {
            var sucursalMapeado = _mapper.Map<Sucursale>(dto);
            sucursalMapeado.UsuarioModificiacionId = null;
            sucursalMapeado.FechaModificacion = null;

            _unitOfWork.Repository<Sucursale>().Add(sucursalMapeado);
            _unitOfWork.SaveChanges();

            dto.IdSucursal = sucursalMapeado.IdSucursal;


            return Respuesta.Success<SucursaleDto>(dto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<SucursaleDto> ActualizarSucursal(SucursaleDto dto)
        {
            if (dto.IdSucursal <= 0)
                return Respuesta.Success(dto, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            var sucursalMapeado = _unitOfWork.Repository<Sucursale>().FirstOrDefault(x => x.IdSucursal == dto.IdSucursal);

            if (sucursalMapeado == null)
                return Respuesta.Success(dto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                sucursalMapeado.IdSucursal = dto.IdSucursal;
                sucursalMapeado.Nombre = dto.Nombre;
                sucursalMapeado.UsuarioModificiacionId = dto.UsuarioModificiacionId;
                sucursalMapeado.FechaModificacion = dto.FechaModificacion;
                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success<SucursaleDto>(dto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<SucursaleDto> DesactivarSucursal(SucursaleDto dto)
        {
            if (dto.IdSucursal <= 0)
                return Respuesta.Success(dto, Mensajes_Globales.IdVacio, Codigos_Globales.BadRequest);

            var sucursalMapeado = _unitOfWork.Repository<Sucursale>().FirstOrDefault(x => x.IdSucursal == dto.IdSucursal);

            if (sucursalMapeado == null)
                return Respuesta.Success(dto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                sucursalMapeado.Activo = false;
                sucursalMapeado.UsuarioModificiacionId = dto.UsuarioModificiacionId;
                sucursalMapeado.FechaModificacion = dto.FechaModificacion;
                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success<SucursaleDto>(dto, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }

        public Respuesta<SucursaleDto> InsertarSucursales(SucursaleDto Dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<SucursaleDto> ActualizarSucursales(SucursaleDto Dto)
        {
            throw new NotImplementedException();
        }

        public Respuesta<SucursaleDto> DesactivarSucursales(SucursaleDto Dto)
        {
            throw new NotImplementedException();
        }
    }
}
