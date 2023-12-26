using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Generales
{
    public class SucursaleMap : IEntityTypeConfiguration<Sucursale>
    {
        public void Configure(EntityTypeBuilder<Sucursale> builder)
        {
            builder.HasKey(e => e.IdSucursal)
                    .HasName("PK_dbo_Sucursales_IdSucursal");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.HasOne(d => d.UsuarioCreacion)
                .WithMany(p => p.SucursaleUsuarioCreacions)
                .HasForeignKey(d => d.UsuarioCreacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PK_dbo_Sucursales_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                .WithMany(p => p.SucursaleUsuarioModificiacions)
                .HasForeignKey(d => d.UsuarioModificiacionId)
                .HasConstraintName("PK_dbo_Sucursales_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");

        }
    }
}
