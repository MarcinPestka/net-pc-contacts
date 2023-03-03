using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) 
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 32));
            optionsBuilder.UseMySql("server=localhost;port=57493;user=root;password=change-me;database=contactsdb",serverVersion);
            
        }

        public DbSet<Contact> Contacts {get;set;}
        public DbSet<Category> Categories {get;set;}

    }
}