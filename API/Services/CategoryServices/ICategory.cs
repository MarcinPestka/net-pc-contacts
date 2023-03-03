namespace API.Services.CategoryServices;

public interface ICategory
{
    Task<IEnumerable<Category>> GetAllContacts();
}