using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Salidas;
using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;
using FluentValidation.Results;
using System.Linq;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SalidasService : ISalidasService<SalidasInventarioDto, SalidasInventarioViewDto>
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;
        private readonly SalidasDomain _salidasDomain;

        public SalidasService(IMapper mapper, UnitOfWorkBuilder unitOfWork, SalidasDomain salidas)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
            _salidasDomain = salidas;
        }
        public Respuesta<List<SalidasInventarioViewDto>> ListarSalida(int idSucursal, DateTime fechaInicio, DateTime fechaFinal)
        {
            var respuesta = (from salida in _unitOfWork.Repository<SalidasInventario>().AsQueryable()
                             join sucursal in _unitOfWork.Repository<Sucursale>().AsQueryable()
                             on salida.IdSucursal equals sucursal.IdSucursal

                             join usuarioEnvia in _unitOfWork.Repository<Usuario>().AsQueryable()
                             on salida.IdUsuario equals usuarioEnvia.IdUsuario

                             join usuarioRecibe in _unitOfWork.Repository<Usuario>().AsQueryable()
                             on salida.IdUsuarioRecibe equals usuarioRecibe.IdUsuario

                             join estado in _unitOfWork.Repository<Api.Estado>().AsQueryable()
                             on salida.IdEstado equals estado.IdEstado
                             where salida.FechaCreacion > fechaInicio && salida.FechaCreacion < fechaFinal
                             && salida.IdSucursal == idSucursal

                             select new SalidasInventarioViewDto
                             {
                                 IdSalidaInventario = salida.IdSalidaInventario,
                                 IdSucursal = salida.IdSucursal,
                                 NombreSucursal = sucursal.Nombre,
                                 IdUsuario = usuarioEnvia.IdUsuario,
                                 NombreUsuario = usuarioEnvia.Nombre,
                                 FechaSalida = salida.FechaSalida,
                                 Total = salida.Total,
                                 FechaRecivido = salida.FechaRecivido,
                                 cantidadProducto = salida.cantidadProducto,
                                 IdUsuarioRecibe = salida.IdUsuarioRecibe,
                                 NombreUsuarioRecibe = usuarioRecibe.Nombre,
                                 IdEstado = salida.IdEstado,
                                 NombreEstado = estado.Nombre,
                                 Detalles = (from detalles in _unitOfWork.Repository<SalidasInventarioDetalle>().AsQueryable()
                                             join lote in _unitOfWork.Repository<ProductosLote>().AsQueryable()
                                             on detalles.IdLote equals lote.IdLote

                                             join producto in _unitOfWork.Repository<Producto>().AsQueryable()
                                             on lote.IdProducto equals producto.IdProductos
                                             select new SalidasInventarioDetallesViewDto
                                             {
                                                 IdDetalle = detalles.IdDetalle,
                                                 IdSalidaInventario = salida.IdSalidaInventario,
                                                 IdLote = lote.IdLote,
                                                 FechaVencimiento = lote.FechaVencimiento,
                                                 IdProducto = producto.IdProductos,
                                                 NombreProducto = producto.Nombre,
                                                 CantidadProducto = detalles.CantidadProducto
                                             }).ToList()
                             }).ToList();
            return Respuesta.Success<List<SalidasInventarioViewDto>>(respuesta, Mensajes_Globales.Listado, Codigos_Globales.Success);

        }

        public Respuesta<SalidasInventarioDto> InsertarSalida(SalidasInventarioDto dto)
        {
            try
            {
                var listadLotes = _unitOfWork.Repository<Api.ProductosLote>().AsQueryable().ToList();
                var validacionesHeader = _salidasDomain.ValidacionesHeader(dto, listadLotes);

                dto.Total = _salidasDomain.SacarTotal(dto, listadLotes);

                if (!validacionesHeader.Ok)
                    return Respuesta.Fault<SalidasInventarioDto>(validacionesHeader.Mensaje, validacionesHeader.Codigo);

                var salidaMapeado = _mapper.Map<SalidasInventarioDto>(dto);
                salidaMapeado.IdEstado = 1;
                var listadoLote = _unitOfWork.Repository<ProductosLote>().AsQueryable().Where(x => x.IdProducto == dto.IdProducto).FirstOrDefault();

                _unitOfWork.BeginTransaction();
                _unitOfWork.Repository<SalidasInventarioDto>().Add(salidaMapeado);

                if (!_unitOfWork.SaveChanges())
                    return Respuesta.Fault<SalidasInventarioDto>(Mensajes_Globales.Error, Codigos_Globales.Error);

                dto.IdSalidaInventario = salidaMapeado.IdSalidaInventario;

                var e = InsertarDetalle(dto);
                if (!e.Ok)
                    return Respuesta.Fault<SalidasInventarioDto>(e.Mensaje, e.Codigo);

                _unitOfWork.Commit();
                return Respuesta.Success(dto, Mensajes_Globales.Agregado, Codigos_Globales.Success);
            }
            catch (Exception ex)
            {
                return Respuesta.Fault<SalidasInventarioDto>(Mensajes_Globales.Error, Codigos_Globales.BadRequest);
            }
        }
        public Respuesta<bool> InsertarDetalle(SalidasInventarioDto dto)
        {
            try
            {
                int aux;
                var cantidadInicial = dto.cantidadProducto;

                List<SalidasInventarioDetallesDto> salidaDto = new List<SalidasInventarioDetallesDto>();
                SalidasInventarioDetalle detallesmapeado = new SalidasInventarioDetalle();
                for (int i = 0; i < cantidadInicial; i++)
                {
                    var listSalida = _unitOfWork.Repository<SalidasInventario>().AsQueryable().ToList();
                    var sumaSucursal = listSalida.Where(x => x.IdSucursal == dto.IdSucursal).Sum(x => x.Total);
                    if (sumaSucursal >= 5000)
                    {
                        cantidadInicial = i;
                    }
                    else
                    {
                        var cantidadCambiante = cantidadInicial;
                        var inventarioDetalle = (from lotes in _unitOfWork.Repository<Api.ProductosLote>().AsQueryable().ToList()
                                                 where lotes.Activo == true && lotes.IdProducto == dto.IdProducto &&
                                                 lotes.Inventario > 0
                                                 orderby lotes.FechaVencimiento ascending
                                                 select lotes).ToList().FirstOrDefault();
                        aux = inventarioDetalle.Inventario - cantidadInicial;
                        cantidadInicial -= inventarioDetalle.Inventario;

                        ProductosLote loteMap = _unitOfWork.Repository<ProductosLote>().FirstOrDefault(x => x.IdLote == inventarioDetalle.IdLote);

                        if (aux <= 0)
                        {
                            loteMap.Inventario = 0;
                            loteMap.Activo = false;
                        }
                        salidaDto.Add(new SalidasInventarioDetallesDto
                        {
                            IdSalidaInventario = dto.IdSalidaInventario,
                            IdLote = loteMap.IdLote,
                            CantidadProducto = cantidadCambiante,
                            UsuarioCreacionId = dto.UsuarioCreacionId,
                            FechaCreacion = DateTime.Now,
                        });
                        detallesmapeado = _mapper.Map<SalidasInventarioDetalle>(salidaDto);
                        _unitOfWork.Repository<SalidasInventarioDetalle>().Add(detallesmapeado);
                    }
                }

                if (!_unitOfWork.SaveChanges())
                    return Respuesta.Success(true);
                return Respuesta.Fault(Mensajes_Globales.Error, Codigos_Globales.BadRecuest, false);
            }
            catch (Exception)
            {
                return Respuesta.Fault(Mensajes_Globales.Error, Codigos_Globales.BadRecuest, false);
            }
        }
        public Respuesta<SalidasInventarioDto> CambarEstadoSalida(SalidasInventarioDto dto)
        {
            SalidasInventario? salidaMapeada = _unitOfWork.Repository<SalidasInventario>().FirstOrDefault(x => x.IdSalidaInventario == dto.IdSalidaInventario);

            if (salidaMapeada == null)
                return Respuesta.Fault<SalidasInventarioDto>(Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                salidaMapeada.IdEstado = 2;
                salidaMapeada.FechaRecivido = DateTime.Now;
                salidaMapeada.IdUsuarioRecibe = dto.IdUsuarioRecibe;
                _unitOfWork.SaveChanges();
            }
            return Respuesta.Success(dto, Mensajes_Globales.Estado, Codigos_Globales.Success);
        }
    }
}
