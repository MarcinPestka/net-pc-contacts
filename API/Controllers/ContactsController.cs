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
    public IEnumerable<PrivateContact> GetAllContacts()
    {
        var res = ContactService.GetAllContacts();
        return res;
    }
    [HttpGet("GetOneContacts")]
    public PrivateContact GetOneContact(int id)
    {
        var res = ContactService.GetOneContact(id);
        return res;
    }
    [HttpPost("AddContact")]
    public IEnumerable<PrivateContact> AddOneContact(PrivateContact contact)
    {
        var res = ContactService.AddOneContact(contact);
        return res;
    }
    [HttpPut("ChangeContact")]
    public IEnumerable<PrivateContact> ChangeContact(int id, PrivateContact contact)
    {
        var res = ContactService.ChangeContact(id, contact);
        return res;
    }
    [HttpDelete("DeleteContact")]
    public IEnumerable<PrivateContact> DeleteContact(int id)
    {
        var res = ContactService.DeleteContact(id);
        return res;
    }
}
