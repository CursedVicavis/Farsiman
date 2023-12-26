using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FarsimanJLS2.Proyecto.Api
{
    public partial class BOCE_DBContext : DbContext
    {
        public BOCE_DBContext()
        {
        }

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=192.168.1.33\\\\\\\\academiagfs,49194;Database=BOCE_DB;User id=academiadev;Password=Demia#20;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empleado>(entity =>
            {
                entity.HasKey(e => e.IdEmpleado)
                    .HasName("PK_dbo_Empleados_IdEmpleado");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Direccion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => e.IdEstado)
                    .HasName("PK_dbo_Estados_IdEstado");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.EstadoUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_Estados_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.EstadoUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("FK_dbo_Estados_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<Perfile>(entity =>
            {
                entity.HasKey(e => e.IdPerfil)
                    .HasName("PK_dbo_Perfiles_IdRol");

                entity.HasIndex(e => e.Nombre, "UQ__Perfiles__75E3EFCF1A667720")
                    .IsUnique();

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PerfilesPorPermiso>(entity =>
            {
                entity.HasKey(e => e.IdPerfilPorPermiso)
                    .HasName("PK_dbo_PerfilesPorPermisos_IdPerfilPorPermiso");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.IdPerfilNavigation)
                    .WithMany(p => p.PerfilesPorPermisos)
                    .HasForeignKey(d => d.IdPerfil)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_PerfilesPorPermisos_dbo_Perfiles_IdPerfil");

                entity.HasOne(d => d.IdPermisoNavigation)
                    .WithMany(p => p.PerfilesPorPermisos)
                    .HasForeignKey(d => d.IdPermiso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_PerfilesPorPermisos_dbo_Permisos_IdPermiso");
            });

            modelBuilder.Entity<Permiso>(entity =>
            {
                entity.HasKey(e => e.IdPermiso)
                    .HasName("PK_dbo_Permisos_IdPantalla");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProductos)
                    .HasName("PK_dbo_Productos_IdProductos");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.ProductoUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_Productos_UsuarioCreacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.ProductoUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("FK_dbo_Productos_UsuarioModificiacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<ProductosLote>(entity =>
            {
                entity.HasKey(e => e.IdLote)
                    .HasName("PK_dbo_ProductosLotes_IdLote");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.FechaVencimiento).HasColumnType("datetime");

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.ProductosLoteUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_ProductosLotes_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.ProductosLoteUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("FK_dbo_ProductosLotes_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<SalidasInventario>(entity =>
            {
                entity.HasKey(e => e.IdSalidaInventario)
                    .HasName("PK_dbo_SalidasInventario_IdSalidaInventario");

                entity.ToTable("SalidasInventario");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.FechaRecivido).HasColumnType("datetime");

                entity.Property(e => e.FechaSalida).HasColumnType("datetime");

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.SalidasInventarioIdEstadoNavigations)
                    .HasForeignKey(d => d.IdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventario_IdEstado_dbo_Estados_IdEstado");

                entity.HasOne(d => d.IdSucursalNavigation)
                    .WithMany(p => p.SalidasInventarios)
                    .HasForeignKey(d => d.IdSucursal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventario_IdSucursal_dbo_Sucursales_IdUsuario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.SalidasInventarioIdUsuarioNavigations)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.IdUsuarioRecibeNavigation)
                    .WithMany(p => p.SalidasInventarioIdUsuarioRecibeNavigations)
                    .HasForeignKey(d => d.IdUsuarioRecibe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuarioRecibe");

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.SalidasInventarioUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventario_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.SalidasInventarioUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("FK_dbo_SalidasInventario_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<SalidasInventarioDetalle>(entity =>
            {
                entity.HasKey(e => e.IdDetalle)
                    .HasName("PK_dbo_SalidasInventarioDetalles_IdDetalle");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.IdLoteNavigation)
                    .WithMany(p => p.SalidasInventarioDetalles)
                    .HasForeignKey(d => d.IdLote)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventarioDetalles_IdLote_dbo_ProductosLotes_IdLote");

                entity.HasOne(d => d.IdSalidaInventarioNavigation)
                    .WithMany(p => p.SalidasInventarioDetalles)
                    .HasForeignKey(d => d.IdSalidaInventario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventarioDetalles_IdSalidaInventario_dbo_SalidasInventario_IdSalidaInventario");

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.SalidasInventarioDetalleUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_SalidasInventarioDetalles_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.SalidasInventarioDetalleUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("FK_dbo_SalidasInventarioDetalles_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<Sucursale>(entity =>
            {
                entity.HasKey(e => e.IdSucursal)
                    .HasName("PK_dbo_Sucursales_IdSucursal");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.UsuarioCreacion)
                    .WithMany(p => p.SucursaleUsuarioCreacions)
                    .HasForeignKey(d => d.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("PK_dbo_Sucursales_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

                entity.HasOne(d => d.UsuarioModificiacion)
                    .WithMany(p => p.SucursaleUsuarioModificiacions)
                    .HasForeignKey(d => d.UsuarioModificiacionId)
                    .HasConstraintName("PK_dbo_Sucursales_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK_dbo_Usarios_IdUsuario");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Contrasena)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEmpleadoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdEmpleado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo_Usuarios_IdEmpleado_dbo_Empleados_IdEmpleado");

                entity.HasOne(d => d.IdPermisoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdPermiso)
                    .HasConstraintName("FK_dbo_Usuarios_IdPermiso_dbo_Permisos_IdPermiso");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
