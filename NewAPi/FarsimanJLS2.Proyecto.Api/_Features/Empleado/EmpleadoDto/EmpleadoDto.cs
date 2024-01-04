namespace FarsimanJLS2.Proyecto.Api._Features.Empleado.EmpleadoDto
{
    public class EmpleadosDto
    {
        public int IdEmpleado { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public int UsuarioCreacionId { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public bool? Activo { get; set; }
    }
}
