using Academia.Proyecto.WebApi._Features.Agrupaciones;
using Academia.Proyecto.WebApi._Features.CadenaTexto;
using Academia.Proyecto.WebApi._Features.Calculadora;
using Academia.Proyecto.WebApi._Features.Empresas;
using Academia.Proyecto.WebApi._Features.Estudiantes;
using Academia.Proyecto.WebApi._Features.Sucursales;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/* Add services to the container. */

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod() );
}); 


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*    AQUI VA LA CONFIGURACION DEL CONTEXT */

//builder.Services.AddDbContext<LogisticContext>(o => o.UseSqlServer(
//    builder.Configuration.GetConnectionStringFromENV("LOGISTIC")
//    ));


//builder.Services.AddAutoMapper(typeof(MapProfile));


//builder.Services.AddFsAuthService((options) =>
//{
//    options.Username = builder.Configuration.GetFromENV("FsIdentityServer:Username");
//    options.Username = builder.Configuration.GetFromENV("FsIdentityServer:Password");
//});


/* Servicios de la Aplicacion */

//builder.Services.AddTransient<EmpresaService>();
builder.Services.AddTransient<CalculadoraService>();
builder.Services.AddTransient<CadenaTextoService>();
builder.Services.AddTransient<AgrupacionService>();
builder.Services.AddTransient<EstidianteService>();
builder.Services.AddTransient<EmpresaService>();
builder.Services.AddTransient<SucursalService>();

var app = builder.Build();

//app.UseFsWebApiExceptionHandler(builder.Configuration["seq:url"], builder.Configuration["seq:key"]);

/* Configure the HTTP request pipeline */

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseCors("AllowSpecificOrigin");
//app.UseFsAuthService();
app.MapControllers();
app.Run();

