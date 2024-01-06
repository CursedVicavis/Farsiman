using AcademiaFS.Proyecto.Api._Common;
using AcademiaFS.Proyecto.Api._Common.NewFolder;
using Farsiman.Application.Core.Standard.DTOs;
using FarsimanJLS2.Proyecto.Api._Features.Salidas.Dto;

namespace FarsimanJLS2.Proyecto.Api._Features.Salidas
{
    public class SalidasDomain
    {
        public Respuesta<bool> ValidacionesHeader(SalidasInventarioDto dto,List<Api.ProductosLote> listadoLotes)
        {
            if (!ValidarVaciosHeader(dto))
                return Respuesta.Fault(Mensajes_Globales.Vacio, Codigos_Globales.BadRequest, false);
            
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
        public int SacarTotal(SalidasInventarioDto dto, List<Api.ProductosLote> listadoLotes)
        {
            var respuesta = listadoLotes.Where(x => x.IdProducto == dto.IdProducto).FirstOrDefault();
            dto.Total = respuesta.Costo * dto.cantidadProducto;
            return dto.Total;
        }
    }
}
