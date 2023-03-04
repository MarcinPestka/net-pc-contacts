using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class RegisterDTO
    {
        [EmailAddress]
        public string email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$")]
        public string password  { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string UserName  { get; set; }
    }
}