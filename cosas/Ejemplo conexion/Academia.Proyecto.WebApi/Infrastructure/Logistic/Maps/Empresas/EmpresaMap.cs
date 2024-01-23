using Academia.Proyecto.WebApi._Features.Empresas.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Academia.Proyecto.WebApi.Infrastructure.Logistic.Maps.Empresas
{
    public class EmpresaMap : IEntityTypeConfiguration<Empresa>
    {
        public void Configure(EntityTypeBuilder<Empresa> builder)
        {
            builder.ToTable("Empresa");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("Empresa_ID").HasColumnType("SMALLINT").IsRequired(true);
        }
    }
}
