
using ApiCatalog.Core.DTOs.Automapper;
using ApiCatalog.Core.Entities;
using ApiCatalog.Core.Interfaces.Repository;
using ApiCatalog.Extensions;
using ApiCatalog.Fillters;
using ApiCatalog.Persistence.Context;
using ApiCatalog.Persistence.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//Inject

//Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Add services to the container.

//Filtro de exeção não tratado
builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(ApiExceptionFilter));
})
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
}).AddNewtonsoftJson();
    

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DB
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString)); 

builder.Services.AddAutoMapper(typeof(UserDTOAutoMappingExtensions));

var app = builder.Build();
 
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.ConfigureExceptionHandler(); // Middleweare personalizado
}

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(x => x.AllowAnyHeader()
      .AllowAnyMethod()
      .WithOrigins("https://localhost:7076", "http://localhost:3001", "http://localhost:3000", "http://localhost"));

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});


app.Run();
