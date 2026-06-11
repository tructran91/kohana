using kohana.Models;
using Microsoft.AspNetCore.Mvc;

namespace kohana.Controllers
{
    public class ContactController : Controller
    {
        // POST: /Contact/Submit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Submit(ContactFormModel model)
        {
            if (!ModelState.IsValid)
            {
                // Trả lại trang chủ kèm lỗi (có thể custom hiển thị lỗi trong view)
                TempData["ContactError"] = "入力内容をご確認ください。";
                return RedirectToAction("Index", "Home");
            }

            // TODO: Gửi email / lưu vào database tại đây
            // Ví dụ dùng MailKit hoặc SmtpClient để gửi mail tới địa chỉ công ty

            TempData["ContactSuccess"] = true;
            return RedirectToAction("Index", "Home", new { }, "lienhe");
        }
    }
}
