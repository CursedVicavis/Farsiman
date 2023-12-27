using AutoMapper;
using FarsimanJLS2.Proyecto.Api._Features.Empleado.EmpleadoDto;
using FarsimanJLS2.Proyecto.Api._Features.Estado.EstadoDto;
using FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto;
using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<ProductosLoteDto, ProductosLote>().ReverseMap();
            CreateMap<EmpleadoDto, Empleado>().ReverseMap();
            CreateMap<EstadoDto, Estado>().ReverseMap();
            CreateMap<ProductoDto, Producto>().ReverseMap();
            CreateMap<ProductosLoteDto, ProductosLote>().ReverseMap();
            CreateMap<SalidasInventarioDetalles, SalidasInventarioDetalle>().ReverseMap();
            CreateMap<SalidasInventarioDto, SalidasInventario>().ReverseMap();
            CreateMap<PerfileDto, Perfile>().ReverseMap();
            CreateMap<PerfilePorPermisoDto, PerfilesPorPermiso>().ReverseMap();
            CreateMap<PermisoDto, Permiso>().ReverseMap();
            CreateMap<UsuarioDto, Usuario>().ReverseMap();
            CreateMap<SucursaleDto, Sucursale>().ReverseMap();
        }
    }
}
