using System.ComponentModel.DataAnnotations;

namespace api.DTOS
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}