using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Salidas;
using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class SalidasService : ISalidasService<SalidasInventarioDto, SalidasInventarioViewDto>
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public SalidasService(IMapper mapper, UnitOfWorkBuilder unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
        }
        public Respuesta<List<SalidasInventarioViewDto>> ListarSalida()
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
                            IdUsuarioRecibe = salida.IdUsuarioRecibe,
                            NombreUsuarioRecibe = usuarioRecibe.Nombre,
                            IdEstado = salida.IdEstado, 
                            NombreEstado = estado.Nombre,
                            Detalles = (from detalles in _unitOfWork.Repository<SalidasInventarioDetalle>().AsQueryable()
                                        join lote in _unitOfWork.Repository<ProductosLote>().AsQueryable()
                                        on detalles.IdLote equals lote.IdLote
                                        
                                        join producto in _unitOfWork.Repository<Producto>().AsQueryable()
                                        on lote.IdProducto equals producto.IdProducto
                                        select new SalidasInventarioDetallesViewDto 
                                        {
                                            IdDetalle = detalles.IdDetalle,
                                            IdSalidaInventario = salida.IdSalidaInventario,
                                            IdLote = lote.IdLote,
                                            FechaVencimiento = lote.FechaVencimiento,
                                            IdProducto = producto.IdProducto,
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
                
            }
            catch (Exception ex) 
            {

                throw;
            }
        }

        public Respuesta<SalidasInventarioDto> DesactivarSalida(SalidasInventarioDto dto)
        {
            //    if (dto.IdUsuario <= 0)
            //        return Mensajes_Globales.IdVacio;

            //    Usuario? usuarioMapeado = _unitOfWork.Repository<Usuario>().FirstOrDefault(x => x.IdUsuario == dto.IdUsuario);


            //    if (usuarioMapeado == null)
            //    {
            //        return Mensajes_Globales.RegistroInexistente;
            //    }
            //    else
            //    {
            //        usuarioMapeado.Activo = false;

            //        _unitOfWork.SaveChanges();
            //    }
            //    dto.IdUsuario = usuarioMapeado.IdUsuario;

            //    return Mensajes_Globales.Desactivado;

            throw new NotImplementedException();
        }
    }
}
