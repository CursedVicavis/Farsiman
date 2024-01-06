using Farsiman.Application.Core.Standard.DTOs;

namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes
{
    public interface IProdcutosLoteService<T,V>   
    {
        public Respuesta<List<V>> ListarLotes();
        public Respuesta<T> InsertarLotes(T dto);
    }
}
