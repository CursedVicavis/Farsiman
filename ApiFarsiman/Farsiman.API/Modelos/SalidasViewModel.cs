using Farsiman.Entities.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Farsiman.API.Modelos
{
    public class SalidasViewModel
    {
        public int sali_Id { get; set; }
        public int? sucu_Id { get; set; }
        [NotMapped]
        public string? sucu_Nombre { get; set; }
        public string? prod_Descripcion { get; set; }
        public string? sali_Fecha { get; set; }
        public string? sade_TotalItems { get; set; }
        public string? usua_Modifica { get; set; }
        public string? sade_Total { get; set; }
        public string? Detalles { get; set; }
        public string? Respuesta { get; set; }
        public string? usua_Nombre { get; set; }

        public int? sali_Estado { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public string usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public string? usua_FechaModificacion { get; set; }
    }
}
