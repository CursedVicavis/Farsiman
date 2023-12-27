using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Generales
{
    public class ProductoMap : IEntityTypeConfiguration<Producto>
    {
        public void Configure(EntityTypeBuilder<Producto> builder)
        {
            builder.HasKey(e => e.IdProducto)
                        .HasName("PK_dbo_Productos_IdProducto");

            builder.Property(e => e.Activo)
                        .IsRequired()
                        .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                        .HasMaxLength(150)
                        .IsUnicode(false);

            builder.HasOne(d => d.UsuarioCreacion)
                        .WithMany(p => p.ProductoUsuarioCreacions)
                        .HasForeignKey(d => d.UsuarioCreacionId)
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_dbo_Productos_UsuarioCreacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                        .WithMany(p => p.ProductoUsuarioModificiacions)
                        .HasForeignKey(d => d.UsuarioModificiacionId)
                        .HasConstraintName("FK_dbo_Productos_UsuarioModificiacionId_dbo_Usuarios_IdUsuario_dbo_Usuarios_IdUsuario");

        }
    }
}
