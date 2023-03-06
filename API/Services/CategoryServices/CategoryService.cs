using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CategoryServices
{
    public class CategoryService : ICategory
    {
        private readonly DataContext context;

        public CategoryService(DataContext context)
        {
            this.context = context; 
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var category = await this.context.Categories.ToListAsync();
            return category;
        }
    }
}