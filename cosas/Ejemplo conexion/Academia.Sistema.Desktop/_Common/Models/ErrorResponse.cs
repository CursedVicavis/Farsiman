using System.Text.Json.Serialization;

namespace Academia.Sistema.Desktop._Common.Models
{
    public class ErrorResponse
    {
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
