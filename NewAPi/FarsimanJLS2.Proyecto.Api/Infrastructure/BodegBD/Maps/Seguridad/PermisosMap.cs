using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Seguridad
{
    public class PermisosMap : IEntityTypeConfiguration<Permiso>
    {
        public void Configure(EntityTypeBuilder<Permiso> builder)
        {
            builder.HasKey(e => e.IdPermiso)
                .HasName("PK_dbo_Permisos_IdPantalla");

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
