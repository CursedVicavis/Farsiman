using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using System;
using FarsimanJLS2.Proyecto.Api._Features.Generales.GeneralesDto;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales.SucursalesDto;
using FarsimanJLS2.Proyecto.Api._Features.Productos;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class ProductosService : IProductoService<ProductoDto>
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public ProductosService(IMapper mapper, UnitOfWorkBuilder unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
        }

        public Respuesta<List<ProductoDto>> ListarProductos()
        {
            var Productos = (from Producto in _unitOfWork.Repository<Producto>().AsQueryable()
                            select new ProductoDto
                            {
                                IdProducto = Producto.IdProducto,
                                Nombre = Producto.Nombre,
                                Activo = Producto.Activo
                            }).ToList();
            return Respuesta.Success<List<ProductoDto>>(Productos, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<ProductoDto> InsertarProductos(ProductoDto dto)
        {

            var ProductoMapeado = _mapper.Map<Producto>(dto);
            ProductoMapeado.UsuarioModificiacionId = null;
            ProductoMapeado.FechaModificacion = null;
            /*
            ProductosValidator validator = new ProductosValidator();

            ValidationResult validationResult = validator.Validate(ProductoMapeado);
            if (!validationResult.IsValid)
            {
                IEnumerable<string> errores = validationResult.Errors.Select(s => s.ErrorMessage);
                string menssageValidation = string.Join(Environment.NewLine, errores);
                return Respuesta.Fault<ProductoDto>(menssageValidation, Codigos_Globales.BadRequest);
            }
            */
            _unitOfWork.Repository<Producto>().Add(ProductoMapeado);
            _unitOfWork.SaveChanges();


            dto.IdProducto = ProductoMapeado.IdProducto;

            return Respuesta.Success(dto, Mensajes_Globales.Agregado, Codigos_Globales.Success);

        }

        public Respuesta<ProductoDto> ActualizarProductos(ProductoDto dto)
        {
            //if (dto.IdProducto <= 0)
            //    return Mensajes_Globales.IdVacio;

            Producto? ProductoMapeado = _unitOfWork.Repository<Producto>().FirstOrDefault(x => x.IdProducto == dto.IdProducto);
            //TransportistaValidator validator = new TransportistaValidator();

            if (ProductoMapeado == null)
                return Respuesta.Success(dto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                /*
                ValidationResult validationResult = validator.Validate(ProductoMapeado);
                if (!validationResult.IsValid)
                {
                    IEnumerable<string> errores = validationResult.Errors.Select(s => s.ErrorMessage);
                    string menssageValidation = string.Join(Environment.NewLine, errores);
                    return menssageValidation;
                }
                */
                ProductoMapeado.IdProducto = dto.IdProducto;
                ProductoMapeado.Nombre = dto.Nombre;
                ProductoMapeado.Activo = dto.Activo;
                ProductoMapeado.UsuarioModificiacionId = dto.UsuarioModificiacionId;
                ProductoMapeado.FechaModificacion = dto.FechaModificacion;

                _unitOfWork.SaveChanges();
            }

            return Respuesta.Success(dto, Mensajes_Globales.Agregado, Codigos_Globales.Success);
        }
        public Respuesta<ProductoDto> DesactivarProductos(ProductoDto dto)
        {
            //if (dto.IdProducto <= 0)
            //    return Mensajes_Globales.IdVacio;

            Producto? ProductoMapeado = _unitOfWork.Repository<Producto>().FirstOrDefault(x => x.IdProducto == dto.IdProducto);


            if (ProductoMapeado == null)
                return Respuesta.Success(dto, Mensajes_Globales.RegistroInexistente, Codigos_Globales.BadRequest);
            else
            {
                ProductoMapeado.Activo = false;
                ProductoMapeado.UsuarioModificiacionId = dto.UsuarioModificiacionId;
                ProductoMapeado.FechaModificacion = dto.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            return Respuesta.Success(dto, Mensajes_Globales.Agregado, Codigos_Globales.Success);
        }
    }
}
