using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Generales
{
    public class EmpleadosMap : IEntityTypeConfiguration<Empleado>
    {
        public void Configure(EntityTypeBuilder<Empleado> builder)
        {
            builder.HasKey(e => e.IdEmpleado)
                    .HasName("PK_dbo_Empleados_IdEmpleado");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.Apellido)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.Property(e => e.Direccion)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);
        }
    }
}
