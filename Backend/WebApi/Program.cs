using Core.Contracts;

using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Keycloak.AuthServices.Common;

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

using Persistence;

using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

var host          = builder.Host;
var configuration = builder.Configuration;
var services      = builder.Services;

services.AddCors();
services.AddControllers();

services.AddKeycloakWebApiAuthentication(builder.Configuration);

services
    .AddAuthorization()
    .AddKeycloakAuthorization(configuration)
    .AddAuthorizationBuilder()
    .AddPolicy("AdminAndUser", builder =>
    {
        var keycloakOptions = configuration.GetKeycloakOptions<KeycloakAuthenticationOptions>()!;

        builder
            //            .RequireRealmRoles("Admin")                                                // Realm role is fetched from token
            //            .RequireResourceRolesForClient(keycloakOptions.Resource, ["myAdminRole"]) // Require Resource Roles (for this Client)
            .RequireResourceRoles("myAdminRole"); // Resource/Client role is fetched from token (any client)
            ;
    })
    .AddPolicy("NormalUser", builder =>
    {
        var keycloakOptions = configuration.GetKeycloakOptions<KeycloakAuthenticationOptions>()!;
        builder
//            .RequireRealmRoles("User")                                                // Realm role is fetched from token
//            .RequireResourceRolesForClient(keycloakOptions.Resource, ["myUserRole"]) // Require Resource Roles (for this Client)
            .RequireResourceRoles("myUserRole"); // Resource/Client role is fetched from token (any client)
        ;
    })
    ;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(c =>
{
    var keycloakOptions = configuration.GetKeycloakOptions<KeycloakAuthenticationOptions>()!;

    c.AddSecurityDefinition(
        "oidc",
        new OpenApiSecurityScheme
        {
            Name             = "oauth2",
            Type             = SecuritySchemeType.OpenIdConnect,
            OpenIdConnectUrl = new Uri(keycloakOptions.OpenIdConnectUrl!)
        }
    );

    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id   = "oidc"
                    }
                },
                Array.Empty<string>()
            }
        }
    );

    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DemoSyp", Version = "v1" });

    var xmlFile = "WebApi.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services
    .AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString))
    .AddScoped<IUnitOfWork, UnitOfWork>()
    .AddTransient<IMDemoRepository, MDemoRepository>()
    ;

var app = builder.Build();
app.MapControllers();


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options =>
    {
        options.PreSerializeFilters.Add((doc, request) =>
        {
            if (request.Host.Value!.Contains(".cloud.htl-leonding.ac.at"))
            {
                doc.Servers = new List<OpenApiServer>
                {
                    new OpenApiServer { Url = $"{request.Scheme}s://{request.Host.Value}/demosypapi" } // Add the custom postfix here
                };
            }
        });
    });
    app.UseSwaggerUI(options => { options.OAuthClientId("myTestAPI"); });
}

// Add CORS to support Single Page Apps (SPAs)
app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();