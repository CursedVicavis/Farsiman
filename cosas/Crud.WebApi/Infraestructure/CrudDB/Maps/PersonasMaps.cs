using Crud._common.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Crud.WebApi.Infraestructure.CrudDB.Maps
{
    public class PersonasMaps : IEntityTypeConfiguration<Persona>
    {
        public void Configure(EntityTypeBuilder<Persona> builder)
        {
            builder.HasKey(e => e.Id)
                .HasName("PK_dbo_Persona_Id");

            builder.Property(e => e.Activo).HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaNacimiento).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.Property(e => e.Apellido)
                .HasMaxLength(150)
                .IsUnicode(false);

        }
    }
}
