using System.ComponentModel.DataAnnotations.Schema;

namespace Farsiman.API.Modelos
{
    public class SalidasDetallesViewModel
    {
        public int sade_Id { get; set; }
        public int? sali_Id { get; set; }
        public int? prod_Id { get; set; }
        [NotMapped]
        public string? prod_Descripcion { get; set; }
        [NotMapped]
        public string? prod_PrecioReal { get; set; }
        public int? sade_Cantidad { get; set; }

    }
}
