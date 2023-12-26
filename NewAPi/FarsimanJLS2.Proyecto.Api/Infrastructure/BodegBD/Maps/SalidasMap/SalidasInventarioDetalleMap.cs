using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.SalidasMap
{
    public class SalidasInventarioDetalleMap : IEntityTypeConfiguration<SalidasInventarioDetalle>
    {
        public void Configure(EntityTypeBuilder<SalidasInventarioDetalle> builder)
        {
            builder.HasKey(e => e.IdDetalle)
                .HasName("PK_dbo_SalidasInventarioDetalles_IdDetalle");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.HasOne(d => d.IdLoteNavigation)
                .WithMany(p => p.SalidasInventarioDetalles)
                .HasForeignKey(d => d.IdLote)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventarioDetalles_IdLote_dbo_ProductosLotes_IdLote");

            builder.HasOne(d => d.IdSalidaInventarioNavigation)
                .WithMany(p => p.SalidasInventarioDetalles)
                .HasForeignKey(d => d.IdSalidaInventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventarioDetalles_IdSalidaInventario_dbo_SalidasInventario_IdSalidaInventario");

            builder.HasOne(d => d.UsuarioCreacion)
                .WithMany(p => p.SalidasInventarioDetalleUsuarioCreacions)
                .HasForeignKey(d => d.UsuarioCreacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_SalidasInventarioDetalles_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                .WithMany(p => p.SalidasInventarioDetalleUsuarioModificiacions)
                .HasForeignKey(d => d.UsuarioModificiacionId)
                .HasConstraintName("FK_dbo_SalidasInventarioDetalles_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");

        }
    }
}
