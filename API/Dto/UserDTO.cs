using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class UserDTO
    {
        public Guid Id {get;set;}
        [Required]
        public string firstName { get; set; }
        [Required]
        [EmailAddress]
        public string lastName { get; set; }
        public string token { get; set; }
        public string UserName  { get; set; }
    }
}