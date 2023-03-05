namespace API.Services.ContactServices;

public interface IContact
{
    Task<IEnumerable<Contact>> GetAllContacts(Guid userID);
    Task<Contact> GetOneContact(Guid id);
    Task<IEnumerable<Contact>> AddOneContact(Contact contact);
    Task<IEnumerable<Contact>> ChangeContact(Guid id, Contact contact);
    Task<IEnumerable<Contact>> DeleteContact(Guid id);
}