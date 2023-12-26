using System;
using System.Collections.Generic;
using FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Generales;
using FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.SalidasMap;
using FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Seguridad;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class BOCE_DBContext : DbContext
    {

        public BOCE_DBContext(DbContextOptions<BOCE_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Empleado> Empleados { get; set; } = null!;
        public virtual DbSet<Estado> Estados { get; set; } = null!;
        public virtual DbSet<Perfile> Perfiles { get; set; } = null!;
        public virtual DbSet<PerfilesPorPermiso> PerfilesPorPermisos { get; set; } = null!;
        public virtual DbSet<Permiso> Permisos { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<ProductosLote> ProductosLotes { get; set; } = null!;
        public virtual DbSet<SalidasInventario> SalidasInventarios { get; set; } = null!;
        public virtual DbSet<SalidasInventarioDetalle> SalidasInventarioDetalles { get; set; } = null!;
        public virtual DbSet<Sucursale> Sucursales { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmpleadosMap());
            modelBuilder.ApplyConfiguration(new EstadoMap());
            modelBuilder.ApplyConfiguration(new ProductoMap());
            modelBuilder.ApplyConfiguration(new SucursaleMap());
            modelBuilder.ApplyConfiguration(new ProductosLoteMap());
            modelBuilder.ApplyConfiguration(new SalidasInventarioMap());
            modelBuilder.ApplyConfiguration(new SalidasInventarioDetalleMap());
            modelBuilder.ApplyConfiguration(new PerfileMap());
            modelBuilder.ApplyConfiguration(new PerfilesPorPermisoMap());
            modelBuilder.ApplyConfiguration(new PermisosMap());
            modelBuilder.ApplyConfiguration(new UsuariosMap());
        }

    }
}
