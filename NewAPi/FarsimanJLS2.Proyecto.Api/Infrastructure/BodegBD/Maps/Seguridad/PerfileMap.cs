using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Seguridad
{
    public class PerfileMap : IEntityTypeConfiguration<Perfile>
    {
        public void Configure(EntityTypeBuilder<Perfile> builder)
        {
            builder.HasKey(e => e.IdPerfil)
                .HasName("PK_dbo_Perfiles_IdRol");

            builder.HasIndex(e => e.Nombre, "UQ__Perfiles__75E3EFCF1A667720")
            .IsUnique();

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        }
    }
}
