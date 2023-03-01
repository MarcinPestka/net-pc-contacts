namespace API.Services.ContactServices;

public class ContactService : IContact
{    
    public static List<PrivateContact> contactsList = new List<PrivateContact>(){
        new PrivateContact{Id = 0,FirstName = "Marcin", LastName = "Pestka", Email = "pestka.m.j@gmail.com", PhoneNumber = "222222222",BirthDate = DateTime.Now},
        new PrivateContact{Id = 1,FirstName = "Paweł", LastName = "Kowalski", Email = "kowal@gmail.com", PhoneNumber = "111111111",BirthDate = DateTime.Now},
        new PrivateContact{Id = 2,FirstName = "Mariusz", LastName = "Pudzianowski", Email = "pudzian@gmail.com", PhoneNumber = "333333333",BirthDate = DateTime.Now},
    };

    public IEnumerable<PrivateContact> ChangeContact(int id, PrivateContact contact)
    {

        return contactsList;
    }

    public IEnumerable<PrivateContact> DeleteContact(int id)
    {
        contactsList.Remove(contactsList.Find(x => x.Id == id));
        return contactsList;
    }

    public IEnumerable<PrivateContact> GetAllContacts()
    {
        return contactsList;
    }

    public PrivateContact GetOneContact(int id)
    {
        PrivateContact contact = contactsList.Find(x => x.Id == id);
        return contact;
    }

    public IEnumerable<PrivateContact> AddOneContact(PrivateContact contact)
    {
        contactsList.Add(contact);
        return contactsList;
    }
}