using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class user : IdentityUser
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public List<Contact> Contacts {get;set;}
    }
}