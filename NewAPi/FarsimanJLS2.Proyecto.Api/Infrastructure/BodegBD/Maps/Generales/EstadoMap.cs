using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD.Maps.Generales
{
    public class EstadoMap : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> builder)
        {
            builder.HasKey(e => e.IdEstado)
                .HasName("PK_dbo_Estados_IdEstado");

            builder.Property(e => e.Activo)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            builder.Property(e => e.FechaCreacion).HasColumnType("datetime");

            builder.Property(e => e.FechaModificacion).HasColumnType("datetime");

            builder.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);

            builder.HasOne(d => d.UsuarioCreacion)
                .WithMany(p => p.EstadoUsuarioCreacions)
                .HasForeignKey(d => d.UsuarioCreacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_dbo_Estados_UsuarioCreacionId_dbo_Usuarios_IdUsuario");

            builder.HasOne(d => d.UsuarioModificiacion)
                .WithMany(p => p.EstadoUsuarioModificiacions)
                .HasForeignKey(d => d.UsuarioModificiacionId)
                .HasConstraintName("FK_dbo_Estados_UsuarioModificiacionId_dbo_Usuarios_IdUsuario");

        }
    }
}
