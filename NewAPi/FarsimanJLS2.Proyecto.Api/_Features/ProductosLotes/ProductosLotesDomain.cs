using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api._Common.NewFolder;
using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes.ProductosLotesDto;

namespace FarsimanJLS2.Proyecto.Api._Features.ProductosLotes
{
    public class ProductosLotesDomain
    {
        public Respuesta<bool> Validaciones(ProductosLoteDto dto)
        {
            if (dto.IdProducto == 0|| dto.CantidadInicial == 0|| dto.FechaModificacion == null || dto.CantidadInicial == 0 || dto.Costo == 0) 
                Respuesta.Fault(Mensajes_Globales.Vacio, Codigos_Globales.BadRequest, false);

            return Respuesta.Success(true);
        }
    }
}
