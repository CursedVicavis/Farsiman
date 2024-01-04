using Farsiman.Application.Core.Standard.DTOs;

namespace FarsimanJLS2.Proyecto.Api._Features.Productos
{
    public interface IProductoService <T>
    {
        public Respuesta<List<T>> ListarProductos();
        public Respuesta<T> InsertarProductos(T dto);
        public Respuesta<T> ActualizarProductos(T dto);
        public Respuesta<T> DesactivarProductos(T dto);
    }
}
