using Application.Mapper;
using Application.Services.ControllerServices;
using Core.Interfaces;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Npgsql")));

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(AppMapProfile));

builder.Services.AddSingleton<ISlugService, SlugService>();
builder.Services.AddScoped<IAppDbSeeder, AppDbSeeder>();

// Реєстрація залежностей
builder.Services.AddScoped<ITargetGroupRepository, TargetGroupRepository>();
builder.Services.AddScoped<ITargetGroupService, TargetGroupService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateAsyncScope())
{
    await scope.ServiceProvider.GetRequiredService<IAppDbSeeder>().SeedAsync();
}

app.Run();
