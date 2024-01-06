using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto;

namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes
{
    public class ProductosLotesService : IProdcutosLoteService<ProductosLoteDto, ProductoLoteViewDto>
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;
        private readonly ProductosLotesDomain _domain;
        public ProductosLotesService(IMapper mapper, UnitOfWorkBuilder unitOfWork, ProductosLotesDomain domain)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
            _domain = domain;
        }
        public Respuesta<ProductosLoteDto> InsertarLotes(ProductosLoteDto dto)
        {
            try
            {
                var validaciones = _domain.Validaciones(dto);
                if (!validaciones.Ok)
                return Respuesta.Fault<ProductosLoteDto>(validaciones.Mensaje, validaciones.Codigo);

                var loteMapeado = _mapper.Map<Api.ProductosLote>(dto);
                loteMapeado.UsuarioModificiacionId = null;
                loteMapeado.FechaModificacion = null;

                _unitOfWork.Repository<ProductosLote>().Add(loteMapeado);

                if (_unitOfWork.SaveChanges())


                dto.IdLote = loteMapeado.IdLote;

                return Respuesta.Success(dto, Mensajes_Globales.Listado, Codigos_Globales.Success);
            }
            catch (Exception)
            {
                return Respuesta.Fault<ProductosLoteDto>(Mensajes_Globales.Error, Codigos_Globales.Error);
            }
        }

        public Respuesta<List<ProductoLoteViewDto>> ListarLotes()
        {
            var listlotes = (from lotes in _unitOfWork.Repository<ProductosLote>().AsQueryable()
                             join producto in _unitOfWork.Repository<Producto>().AsQueryable()
                             on lotes.IdProducto equals producto.IdProductos
                             where lotes.Activo == true
                             select new ProductoLoteViewDto
                             {
                                 IdLote = lotes.IdLote,
                                 IdProducto = lotes.IdProducto,
                                 NombreProducto = producto.Nombre,
                                 CantidadInicial = lotes.CantidadInicial,
                                 FechaVencimiento = lotes.FechaVencimiento,
                                 Inventario = lotes.Inventario,
                             }).ToList();

            return Respuesta.Success<List<ProductoLoteViewDto>>(listlotes, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
    }
}
