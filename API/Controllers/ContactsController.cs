using API.Services.ContactServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ContatcsController : ControllerBase
{    
    private readonly IContact ContactService;
    public ContatcsController(IContact ContactService)
    {
        this.ContactService = ContactService;
    }

    [HttpGet("GetAllContacts")]
    public async Task<IEnumerable<Contact>> GetAllContacts()
    {
        var res = await ContactService.GetAllContacts();
        return res;
    }
    [HttpGet("GetOneContacts")]
    public async Task<Contact> GetOneContact(int id)
    {
        var res = await ContactService.GetOneContact(id);
        return res;
    }
    [HttpPost("AddContact")]
    public async Task<IEnumerable<Contact>> AddOneContact(Contact contact)
    {
        var res = await ContactService.AddOneContact(contact);
        return res;
    }
    [HttpPut("ChangeContact")]
    public async Task<IEnumerable<Contact>> ChangeContact(int id, Contact contact)
    {
        var res = await ContactService.ChangeContact(id, contact);
        return res;
    }
    [HttpDelete("DeleteContact")]
    public async Task<IEnumerable<Contact>> DeleteContact(int id)
    {
        var res = await ContactService.DeleteContact(id);
        return res;
    }
}
