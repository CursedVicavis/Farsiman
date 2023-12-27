using System;
using System.Collections.Generic;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class Usuario
    {
        public Usuario()
        {
            EstadoUsuarioCreacions = new HashSet<Estado>();
            EstadoUsuarioModificiacions = new HashSet<Estado>();
            ProductoUsuarioCreacions = new HashSet<Producto>();
            ProductoUsuarioModificiacions = new HashSet<Producto>();
            ProductosLoteUsuarioCreacions = new HashSet<ProductosLote>();
            ProductosLoteUsuarioModificiacions = new HashSet<ProductosLote>();
            SalidasInventarioDetalleUsuarioCreacions = new HashSet<SalidasInventarioDetalle>();
            SalidasInventarioDetalleUsuarioModificiacions = new HashSet<SalidasInventarioDetalle>();
            SalidasInventarioIdEstadoNavigations = new HashSet<SalidasInventario>();
            SalidasInventarioIdUsuarioNavigations = new HashSet<SalidasInventario>();
            SalidasInventarioIdUsuarioRecibeNavigations = new HashSet<SalidasInventario>();
            SalidasInventarioUsuarioCreacions = new HashSet<SalidasInventario>();
            SalidasInventarioUsuarioModificiacions = new HashSet<SalidasInventario>();
            SucursaleUsuarioCreacions = new HashSet<Sucursale>();
            SucursaleUsuarioModificiacions = new HashSet<Sucursale>();
        }

        public int IdUsuario { get; set; }
        public int IdEmpleado { get; set; }
        public string Nombre { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
        public bool? EsAdmin { get; set; }
        public int? IdPerfil { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioModificiacionId { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool? Activo { get; set; }

        public virtual Empleado IdEmpleadoNavigation { get; set; } = null!;
        public virtual Perfile? IdPerfilNavigation { get; set; }
        public virtual ICollection<Estado> EstadoUsuarioCreacions { get; set; }
        public virtual ICollection<Estado> EstadoUsuarioModificiacions { get; set; }
        public virtual ICollection<Producto> ProductoUsuarioCreacions { get; set; }
        public virtual ICollection<Producto> ProductoUsuarioModificiacions { get; set; }
        public virtual ICollection<ProductosLote> ProductosLoteUsuarioCreacions { get; set; }
        public virtual ICollection<ProductosLote> ProductosLoteUsuarioModificiacions { get; set; }
        public virtual ICollection<SalidasInventarioDetalle> SalidasInventarioDetalleUsuarioCreacions { get; set; }
        public virtual ICollection<SalidasInventarioDetalle> SalidasInventarioDetalleUsuarioModificiacions { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarioIdEstadoNavigations { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarioIdUsuarioNavigations { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarioIdUsuarioRecibeNavigations { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarioUsuarioCreacions { get; set; }
        public virtual ICollection<SalidasInventario> SalidasInventarioUsuarioModificiacions { get; set; }
        public virtual ICollection<Sucursale> SucursaleUsuarioCreacions { get; set; }
        public virtual ICollection<Sucursale> SucursaleUsuarioModificiacions { get; set; }
    }
}
