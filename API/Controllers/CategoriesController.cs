using API.Services.CategoryServices;
using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
        [HttpGet("GetAllCategories")]
        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var res = await CategoryService.GetAllCategories();
            return res;
        }
    }
}