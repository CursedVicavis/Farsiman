using AcademiaFS.Proyecto.Api._Common.NewFolder;
using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api.Infrastructure;
using AutoMapper;
using Farsiman.Application.Core.Standard.DTOs;
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad.SeguridadDto;
using System;

namespace FarsimanJLS2.Proyecto.Api._Features.Seguridad
{
    public class ProductosService
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public ProductosService(IMapper mapper, UnitOfWorkBuilder unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork.builderTransporte();
        }

        public Respuesta<List<ProductoDto>> ListarTransportista()
        {
            var Productos = (from Producto in _unitOfWork.Repository<Producto>().AsQueryable()
                            select new ProductoDto
                            {
                                IdProductos = Producto.IdProducto,
                                Nombre = Producto.Nombre,
                                Activo = Producto.Activo
                            }).ToList();
            return Respuesta.Success<List<ProductoDto>>(Productos, Mensajes_Globales.Listado, Codigos_Globales.Success);
        }
        public Respuesta<ProductoDto> InsertarProductos(ProductoDto Productos)
        {

            var ProductoMapeado = _mapper.Map<Producto>(Productos);
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


            Productos.IdProducto = ProductoMapeado.IdProductos;

            return Respuesta.Success(Productos, Mensajes_Globales.Agregado, Codigos_Globales.Success);

        }

        public string ActualizarProducto(ProductoDto Productos)
        {
            if (Productos.IdProducto <= 0)
                return Mensajes_Globales.IdVacio;

            Producto? ProductoMapeado = _unitOfWork.Repository<Producto>().FirstOrDefault(x => x.IdProducto == Productos.IdProducto);
            //TransportistaValidator validator = new TransportistaValidator();

            if (ProductoMapeado == null)
            {
                return Mensajes_Globales.RegistroInexistente;
            }
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
                ProductoMapeado.IdProductos = Productos.IdProducto;
                ProductoMapeado.Nombre = Productos.Nombre;
                ProductoMapeado.Activo = Productos.Activo;
                ProductoMapeado.UsuarioCreacionId = Productos.UsuarioCreacionId;
                ProductoMapeado.FechaCreacion = Productos.FechaCreacion;
                ProductoMapeado.UsuarioModificiacionId = Productos.UsuarioModificiacionId;
                ProductoMapeado.FechaModificacion = Productos.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            Productos.IdProducto = ProductoMapeado.IdProducto;

            return Mensajes_Globales.Editado;
        }
        public string DesactivarProducto(ProductoDto Productos)
        {
            if (Productos.IdProducto <= 0)
                return Mensajes_Globales.IdVacio;

            Producto? ProductoMapeado = _unitOfWork.Repository<Producto>().FirstOrDefault(x => x.IdProducto == Productos.IdProducto);


            if (ProductoMapeado == null)
            {
                return Mensajes_Globales.RegistroInexistente;
            }
            else
            {
                ProductoMapeado.Activo = false;
                ProductoMapeado.UsuarioModificiacionId = Productos.UsuarioModificiacionId;
                ProductoMapeado.FechaModificacion = Productos.FechaModificacion;

                _unitOfWork.SaveChanges();
            }
            Productos.IdProducto = ProductoMapeado.IdProducto;

            return Mensajes_Globales.Desactivado;
        }
    }
}
