namespace kohana.Models
{
    public class HomeViewModel
    {
        public List<NavItem> NavItems { get; set; } = new();
        public List<BusinessItem> Businesses { get; set; } = new();
        public List<CompanyInfoItem> CompanyInfo { get; set; } = new();

        // Thông tin bản đồ (vị trí công ty)
        public double MapLat { get; set; }
        public double MapLng { get; set; }
        public int MapZoom { get; set; }
    }
}
