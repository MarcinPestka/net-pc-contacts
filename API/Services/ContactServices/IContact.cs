namespace API.Services.ContactServices;

public interface IContact
{
    Task<IEnumerable<Contact>> GetAllContacts();
    Task<Contact> GetOneContact(int id);
    Task<IEnumerable<Contact>> AddOneContact(Contact contact);
    Task<IEnumerable<Contact>> ChangeContact(int id, Contact contact);
    Task<IEnumerable<Contact>> DeleteContact(int id);
}