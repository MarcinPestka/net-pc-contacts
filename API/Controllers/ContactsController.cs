using API.Services.ContactServices;
using Microsoft.AspNetCore.Authorization;
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
    public async Task<IEnumerable<Contact>> GetAllContacts(Guid userId)
    {
        var res = await ContactService.GetAllContacts(userId);
        return res;
    }
    [AllowAnonymous]
    [HttpGet("GetAllContactsUnAuth")]
    public async Task<IEnumerable<Contact>> GetAllContactsUnAuth()
    {
        var res = await ContactService.GetAllContactsUnAuth();
        return res;
    }

    [HttpGet("GetOneContacts")]
    public async Task<Contact> GetOneContact(Guid id)
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
    public async Task<IEnumerable<Contact>> ChangeContact(Guid id, Contact contact)
    {
        var res = await ContactService.ChangeContact(id, contact);
        return res;
    }
    [HttpDelete("DeleteContact")]
    public async Task<IEnumerable<Contact>> DeleteContact(Guid id)
    {
        var res = await ContactService.DeleteContact(id);
        return res;
    }
}
