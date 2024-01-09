namespace MyMvcApp.Models;

public class ErrorViewModel
{
    public string? RequestId { get; set; }



    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}

public class Photo
{
    public int Id { get; set; }
    public byte[] ImageData { get; set; }
}
