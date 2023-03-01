using Microsoft.AspNetCore.Mvc;

namespace API.Models;

public class PrivateContact
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime BirthDate { get; set; }
    public string Category { get; set; }
}