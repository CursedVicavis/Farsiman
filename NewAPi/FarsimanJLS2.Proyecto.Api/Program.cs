using AcademiaFS.Proyecto.Api.Infrastructure;
using Farsiman.Extensions.Configuration;
using FarsimanJLS2.Proyecto.Api;
using FarsimanJLS2.Proyecto.Api._Features.Empleado;
using FarsimanJLS2.Proyecto.Api._Features.Estado;
using FarsimanJLS2.Proyecto.Api._Features.Estados;
using FarsimanJLS2.Proyecto.Api._Features.Productos;
using FarsimanJLS2.Proyecto.Api._Features.ProductosLotes;
using FarsimanJLS2.Proyecto.Api._Features.Salidas;
using FarsimanJLS2.Proyecto.Api._Features.Seguridad;
using FarsimanJLS2.Proyecto.Api._Features.Sucursales;
using FarsimanJLS2.Proyecto.Api.Infrastructure.BodegBD;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
     builder => builder.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerForFsIdentityServer(opt =>
{
    opt.Title = "Prueba";
    opt.Description = "Descripción";
    opt.Version = "v1.0";
});

builder.Services.AddFsAuthService(configureOptions =>
{
    configureOptions.Username = builder.Configuration.GetFromENV("Configurations:FsIdentityServer:Username");
    configureOptions.Password = builder.Configuration.GetFromENV("Configurations:FsIdentityServer:Password");
});
var connectionString = builder.Configuration.GetConnectionString("EFCoreTransporte");
builder.Services.AddDbContext<BOCE_DBContext>(options =>
{
    options.UseSqlServer(connectionString);
    //,
    //sqlServerOptionsAction: sqlOptions =>
    //{
    //    sqlOptions.EnableRetryOnFailure(
    //        maxRetryCount: 5,   // Maximum number of retries
    //        maxRetryDelay: TimeSpan.FromSeconds(30), // Maximum delay between retries
    //        errorNumbersToAdd: null // SQL Server error numbers to retry on
    //    );
    //});
});
builder.Services.AddTransient<UnitOfWorkBuilder, UnitOfWorkBuilder>();
builder.Services.AddAutoMapper(typeof(MapProfile));

builder.Services.AddTransient<EmpleadoDomain>();
builder.Services.AddTransient<EmpleadoService>();

builder.Services.AddTransient<EstadoDomain>();
builder.Services.AddTransient<EstadoService>();

builder.Services.AddTransient<ProductosService>();
builder.Services.AddTransient<ProductosDomain>();

builder.Services.AddTransient<ProductosLotesService>();
builder.Services.AddTransient<ProductosLotesDomain>();

builder.Services.AddTransient<SalidasService>();
builder.Services.AddTransient<SalidasDomain>();

builder.Services.AddTransient<SeguridadService>();
builder.Services.AddTransient<SeguridadDomain>();

builder.Services.AddTransient<SucursalesDomain>();
builder.Services.AddTransient<SucursalesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerWithFsIdentityServer();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
