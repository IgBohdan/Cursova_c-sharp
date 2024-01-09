using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://localhost:3000", "http://192.168.0.109:3000", "http://192.168.0.107") 
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
        });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://localhost:3000", "http://192.168.0.109:3000", "http://192.168.0.107")
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseCors("AllowSpecificOrigin");


        app.UseAuthentication();
        app.UseAuthorization();
    }
}
