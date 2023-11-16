using Farsiman.BussinessLogic;
using Microsoft.Extensions.Configuration;
using SIMEXPRO.API.Extentions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.DataAccess(builder.Configuration.GetConnectionString("ConexionFarsiman"));
builder.Services.BussinessLogic();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(x => x.AddProfile<MappingProfileExtensions>(), AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowLocalhost3000");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
