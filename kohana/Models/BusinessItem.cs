namespace kohana.Models
{
    public class BusinessItem
    {
        public string Icon { get; set; } = ""; // tên icon (svg) sẽ render trong view
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Image { get; set; } = "";
    }
}
