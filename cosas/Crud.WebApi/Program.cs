using AcademiaFS.Proyecto.Api.Infrastructure;
using Crud.WebApi.Infraestructure.CrudDB;
using Farsiman.Extensions.Configuration;
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
builder.Services.AddSwaggerGen(); builder.Services.AddSwaggerForFsIdentityServer(opt =>
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
builder.Services.AddDbContext<CrudTestingJLContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddTransient<UnitOfWorkBuilder, UnitOfWorkBuilder>();

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
