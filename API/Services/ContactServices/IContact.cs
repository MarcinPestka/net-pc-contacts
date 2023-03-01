namespace API.Services.ContactServices;

public interface IContact
{
    IEnumerable<PrivateContact> GetAllContacts();
    PrivateContact GetOneContact(int id);
    IEnumerable<PrivateContact> AddOneContact(PrivateContact contact);
    IEnumerable<PrivateContact> ChangeContact(int id, PrivateContact contact);
    IEnumerable<PrivateContact> DeleteContact(int id);
}