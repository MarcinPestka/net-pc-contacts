using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ContactServices;

public class ContactService : IContact
{    
    private readonly DataContext context;

    public ContactService(DataContext context)
    {
        this.context = context; 
    }

    public async Task<IEnumerable<Contact>> ChangeContact(Guid id, Contact contact)
    {
       var contactOld = await this.context.Contacts.FindAsync(id);

            contactOld.FirstName = contact.FirstName;
            contactOld.LastName = contact.LastName;
            contactOld.Email = contact.Email;
            contactOld.PhoneNumber = contact.PhoneNumber;
            contactOld.BirthDate = contact.BirthDate;
            contactOld.Category = contact.Category;

            await this.context.SaveChangesAsync();

            return await this.context.Contacts.ToListAsync();
    }

    public async Task<IEnumerable<Contact>> DeleteContact(Guid id)
    {
         var contact = await this.context.Contacts.FindAsync(id);

        this.context.Contacts.Remove(contact);
        await this.context.SaveChangesAsync();

        return await this.context.Contacts.ToListAsync();
    }

    public async Task<IEnumerable<Contact>> GetAllContacts()
    {
        var contacts = await this.context.Contacts.ToListAsync();
        return contacts;
    }

    public async Task<Contact> GetOneContact(Guid id)
    {
        var contact = await this.context.Contacts.FindAsync(id);
        return contact;
    }

    public async Task<IEnumerable<Contact>> AddOneContact(Contact contact)
    {
        this.context.Contacts.Add(contact);
        await this.context.SaveChangesAsync();

        return await this.context.Contacts.ToListAsync();
    }
}