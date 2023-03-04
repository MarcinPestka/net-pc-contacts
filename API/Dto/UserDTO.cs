using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class UserDTO
    {
        [Required]
        public string firstName { get; set; }
        [Required]
        [EmailAddress]
        public string lastName { get; set; }
        public string token { get; set; }
        public string UserName  { get; set; }
    }
}