using API.Services.CategoryServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategory CategoryService;
        public CategoriesController(ICategory CategoryService)
        {
            this.CategoryService = CategoryService;
        }

        [HttpGet("GetAllCategories")]
        public async Task<IEnumerable<Category>> GetAllContacts()
        {
            var res = await CategoryService.GetAllContacts();
            return res;
        }
    }
}