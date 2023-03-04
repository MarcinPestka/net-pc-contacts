using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<user> 
    {
        private readonly IConfiguration config;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration config) 
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 32));
            optionsBuilder.UseMySql(config["ConnectionString"],serverVersion);
            
        }

        public DbSet<Contact> Contacts {get;set;}
        public DbSet<Category> Categories {get;set;}

    }
}