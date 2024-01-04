using Farsiman.Application.Core.Standard.DTOs;

namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes
{
    public interface IProdcutosLoteService<T>   
    {
        public Respuesta<List<T>> ListarLotesService();
        public Respuesta<T> InsertarLotesService(T dto);
        public Respuesta<T> ActualizarLotesService(T dto);
        public Respuesta<T> DesactivarLotesService(T dto);
    }
}
