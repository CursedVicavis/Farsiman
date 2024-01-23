namespace Academia.Proyecto.WebApi._Features.Sucursales.Entities
{
    public class Sucursal
    {
        public int SucursalId { get; set; }
        public string NombreSucursal { get; set; }
        public bool Activa { get; set; }

        public Sucursal() 
        {
            NombreSucursal = string.Empty;
        }
    }
}
