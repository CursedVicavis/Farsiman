using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Seguridad
{
    public class PerfilesPorPermisoMap : IEntityTypeConfiguration<PerfilesPorPermiso>
    {
        public void Configure(EntityTypeBuilder<PerfilesPorPermiso> builder)
        {
            builder.HasKey(e => e.IdPerfilPorPermiso)
                .HasName("PK_dbo_PerfilesPorPermisos_IdPerfilPorPermiso");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.HasOne(d => d.IdPerfilNavigation)
                .WithMany(p => p.PerfilesPorPermisos)
                .HasForeignKey(d => d.IdPerfil)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_PerfilesPorPermisos_dbo_Perfiles_IdPerfil");

            builder.HasOne(d => d.IdPermisoNavigation)
                .WithMany(p => p.PerfilesPorPermisos)
                .HasForeignKey(d => d.IdPermiso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_PerfilesPorPermisos_dbo_Permisos_IdPermiso");

        }
    }
}
