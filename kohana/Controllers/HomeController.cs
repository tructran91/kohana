using kohana.Models;
using Microsoft.AspNetCore.Mvc;

namespace kohana.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var model = new HomeViewModel
            {
                NavItems = new List<NavItem>
                {
                    new() { Label = "KOHANAとは？", Id = "about",    ShortLabel = "KOHANA" },
                    new() { Label = "事業内容",     Id = "business", ShortLabel = "事業" },
                    new() { Label = "会社概要",     Id = "company",  ShortLabel = "会社" },
                    new() { Label = "お問い合せ",   Id = "contact",  ShortLabel = "問い合" },
                },

                Businesses = new List<BusinessItem>
                {
                    new()
                    {
                        Icon = "package",
                        Title = "輸出入事業",
                        Description = "日本国内の健康・医療関連商品、サプリメント、日用品などをベトナムへ輸出するとともに、ベトナムおよび中国からの多様な商品を日本へ輸入しております。",
                        Image = "https://images.unsplash.com/photo-1755072970471-4c4fe988f4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                    },
                    new()
                    {
                        Icon = "shopping-bag",
                        Title = "国内販売事業",
                        Description = "輸入商品だけでなく、日本国内の高品質な製品も取り扱い、全国の小売市場およびオンラインを通じて販売しています。",
                        Image = "https://images.unsplash.com/photo-1766871138762-51db92945bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                    },
                    new()
                    {
                        Icon = "layers",
                        Title = "自社ブランド事業",
                        Description = "当社が登録したブランドに基づき、オリジナル製品を企画・製造し、国内外に向けて販売しています。",
                        Image = "https://images.unsplash.com/photo-1643123158509-b07b9fd5e802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                    },
                },

                CompanyInfo = new List<CompanyInfoItem>
                {
                    new() { Label = "会社名",     Value = "KOHANA国際貿易株式会社" },
                    new() { Label = "代表者",     Value = "チャン バン ティン" },
                    new() { Label = "本社",       Value = "〒274-0067 千葉県船橋市大穴南1丁目40番6号" },
                    new() { Label = "松戸倉庫",   Value = "〒370-0615 群馬県邑楽郡邑楽町篠塚1624-1" },
                    new() { Label = "電話番号",   Value = "TEL: 047-466-8658" },
                    new() { Label = "設立",       Value = "令和5年8月2日" },
                    new() { Label = "資本金",     Value = "5,000,000円" },
                    new() { Label = "取引先銀行", Value = "楽天銀行 第３営業支店 / GMOあおぞらネット銀行 法人第2営業部支店" },
                    new() { Label = "古物商許可", Value = "第441360002010号" },
                },

                MapLat = 35.7219,
                MapLng = 140.0053,
                MapZoom = 15,
            };

            return View(model);
        }

        // POST: /Home/Contact
        // Xử lý form liên hệ (tương đương onSubmit trong React)
        [HttpPost]
        public IActionResult Contact(string name, string email, string message)
        {
            // TODO: lưu DB hoặc gửi email tại đây
            TempData["ContactSuccess"] = true;
            return RedirectToAction("Index", "Home", "contact");
        }
    }
}
