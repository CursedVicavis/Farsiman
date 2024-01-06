
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.SalidasMap
{
    public class SalidasInventarioMap : IEntityTypeConfiguration<SalidasInventario>
    {
        public void Configure(EntityTypeBuilder<SalidasInventario> builder)
        {
            builder.HasKey(e => e.IdSalidaInventario)
                .HasName("PK_dbo_SalidasInventario_IdSalidaInventario");

            builder.ToTable("SalidasInventario");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.FechaRecivido).HasColumnType("datetime");

            builder.Property(e => e.FechaSalida).HasColumnType("datetime");

            builder.HasOne(d => d.IdEstadoNavigation)
                .WithMany(p => p.SalidasInventarioIdEstadoNavigations)
                .HasForeignKey(d => d.IdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventario_IdEstado_dbo_Estados_IdEstado");

            builder.HasOne(d => d.IdSucursalNavigation)
                .WithMany(p => p.SalidasInventarios)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventario_IdSucursal_dbo_Sucursales_IdUsuario");

            builder.HasOne(d => d.IdUsuarioNavigation)
                .WithMany(p => p.SalidasInventarioIdUsuarioNavigations)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.IdUsuarioRecibeNavigation)
                .WithMany(p => p.SalidasInventarioIdUsuarioRecibeNavigations)
                .HasForeignKey(d => d.IdUsuarioRecibe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventario_IdUsuario_dbo_Usuarios_IdUsuarioRecibe");

            builder.HasOne(d => d.UsuarioCreacion)
                .WithMany(p => p.SalidasInventarioUsuarioCreacions)
                .HasForeignKey(d => d.UsuarioCreacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventario_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                .WithMany(p => p.SalidasInventarioUsuarioModificiacions)
                .HasForeignKey(d => d.UsuarioModificiacionId)
                .HasConstraintName("FK_dbo_SalidasInventario_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");

        }
    }
}
