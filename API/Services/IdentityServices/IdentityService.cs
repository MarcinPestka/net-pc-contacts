using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services.IdentityService
{
    public class IdentityService
    {
        private readonly DataContext context;

        public IdentityService(DataContext context)
        {
            this.context = context; 
        }

        public async Task<IEnumerable<Category>> GetAllContacts()
        {
            var category = await this.context.Categories.ToListAsync();
            return category;
        }
    }
}