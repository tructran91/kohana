using System.ComponentModel.DataAnnotations;

namespace kohana.Models
{
    public class ContactFormModel
    {
        [Required(ErrorMessage = "お名前を入力してください。")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "メールアドレスを入力してください。")]
        [EmailAddress(ErrorMessage = "メールアドレスの形式が正しくありません。")]
        public string Email { get; set; } = string.Empty;

        public string? Message { get; set; }
    }
}
