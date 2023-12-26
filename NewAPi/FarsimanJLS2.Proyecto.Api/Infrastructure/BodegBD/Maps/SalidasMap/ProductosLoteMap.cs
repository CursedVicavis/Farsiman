using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.SalidasMap
{
    public class ProductosLoteMap : IEntityTypeConfiguration<ProductosLote>
    {
        public void Configure(EntityTypeBuilder<ProductosLote> builder)
        {
            builder.HasKey(e => e.IdLote)
                .HasName("PK_dbo_ProductosLotes_IdLote");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.FechaVencimiento).HasColumnType("datetime");

            builder.HasOne(d => d.UsuarioCreacion)
                .WithMany(p => p.ProductosLoteUsuarioCreacions)
                .HasForeignKey(d => d.UsuarioCreacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_ProductosLotes_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                .WithMany(p => p.ProductosLoteUsuarioModificiacions)
                .HasForeignKey(d => d.UsuarioModificiacionId)
                .HasConstraintName("FK_dbo_ProductosLotes_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");

        }
    }
}
