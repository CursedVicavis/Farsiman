using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Seguridad
{
    public class UsuariosMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(e => e.IdUsuario)
                .HasName("PK_dbo_Usarios_IdUsuario");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.Contrasena)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.HasOne(d => d.IdEmpleadoNavigation)
                .WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdEmpleado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_Usuarios_IdEmpleado_dbo_Empleados_IdEmpleado");

            builder.HasOne(d => d.IdPermisoNavigation)
                .WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdPermiso)
                .HasConstraintName("FK_dbo_Usuarios_IdPermiso_dbo_Permisos_IdPermiso");
        }
    }
}
