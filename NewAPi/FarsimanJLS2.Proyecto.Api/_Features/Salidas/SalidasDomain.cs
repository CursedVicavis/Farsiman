using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;

namespace FarsimanJLS2.Proyecto.Api._Features.Salidas
{
    public class SalidasDomain
    {
        public Respuesta<bool> ValidacionesHeader()
        {
            return Respuesta.Success(true);
        }
        public Respuesta<bool> ValidacionesDetalles()
        {
            return Respuesta.Success(true);
        }
        public bool ValidarVaciosHeader(SalidasInventarioDto dto)
        {
            if (dto.IdSucursal == 0 || dto.IdUsuario == 0 || dto.cantidadProducto == 0 )
                return false;
            return true;
        }
        public bool ValidarInventarioSuficiente(List<Api.ProductosLote> listadoLotes, List<SalidasInventarioDetallesDto> dto)
        {
            var a = (from lote in listadoLotes
                    orderby lote.FechaVencimiento
                     select lote).Single();

            //foreach (var item in dto)
            //{
            //    if (item.CantidadProducto >= listadoLotes.FirstOrDefault().Inventario)
            //    { 
                
            //    }
            //    var res = (from lotes in listadoLotes
            //                where lotes.IdProducto == item.IdProducto
            //                orderby lotes.FechaVencimiento
            //                select new ProductosLote
            //                {
            //                    Inventario = lotes.Inventario - item.CantidadProducto
            //                }).ToList();
            //}
            return true;
        }
    }
}
