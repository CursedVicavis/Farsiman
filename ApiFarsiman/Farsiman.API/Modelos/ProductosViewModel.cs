namespace Farsiman.API.Modelos
{
    public class ProductosViewModel
    {

        public int prod_Id { get; set; }
        public string prod_Descripcion { get; set; }
        public decimal? prod_Precio { get; set; }
        public int usua_UsuarioCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuarioModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
    }
}
