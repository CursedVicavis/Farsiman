using RestSharp;
using System.Net;
using Academia.Sistema.Desktop._Common.Models;
using System.Text.Json;

namespace Academia.Sistema.Desktop.Utility
{
    public class HttpClientFs
    {
        private readonly RestClient _client;

        /// <summary>
        /// Inicializar instancia de cliente http.
        /// </summary>
        /// <param name="baseUrl">Url del api</param>
        public HttpClientFs(string baseUrl)
        {
            _client = new RestClient(baseUrl);
        }

        /// <summary>
        /// Método para peticiones de tipo GET
        /// </summary>
        /// <typeparam name="T">Tipo de dato a recibir</typeparam>
        /// <param name="ruta">Ruta de acción en API</param>
        /// <returns>Item 1: Datos; Item 2: El error en caso de existir</returns>
        public async Task<(TGet, string)> GetAsync<TGet>(string ruta)
        {
            var request = new RestRequest(ruta, Method.Get);
            //if (!string.IsNullOrEmpty(SesionUsuario.Token))
            //    request.AddHeader("Authorization", $"Bearer {SesionUsuario.Token}");
            var response = await _client.ExecuteAsync<TGet>(request);
            string error = ValidarRespuesta(response);
            _client.Dispose();
            return (response.Data, error);
        }

        /// <summary>
        /// Método para peticiones de tipo POST
        /// </summary>
        /// <typeparam name="T">Tipo de dato a recibir</typeparam>
        /// <param name="ruta">Ruta de acción en API</param>
        /// <param name="data">Datos a enviar. Puede ser null.</param>
        /// <returns>Item 1: Datos; Item 2: El error en caso de existir</returns>
        public async Task<(TPost, string)> PostAsync<TPost>(string ruta, object data = null, bool dataAsForm = false)
        {
            var request = new RestRequest(ruta, Method.Post);
            if (data != null && !dataAsForm)
                request.AddBody(data);
            if (data != null && dataAsForm)
                request.AddObject(data);
            //if (!string.IsNullOrEmpty(SesionUsuario.Token))
            //    request.AddHeader("Authorization", $"Bearer {SesionUsuario.Token}");
            var response = await _client.ExecuteAsync<TPost>(request);
            string error = ValidarRespuesta(response);
            _client.Dispose();
            return (response.Data, error);
        }

        /// <summary>
        /// Método para peticiones de tipo PUT
        /// </summary>
        /// <typeparam name="T">Tipo de dato a recibir</typeparam>
        /// <param name="ruta">Ruta de acción en API</param>
        /// <param name="data">Datos a enviar. Puede ser null.</param>
        /// <returns>Item 1: Datos; Item 2: El error en caso de existir</returns>
        public async Task<(TPut, string)> PutAsync<TPut>(string ruta, object data = null)
        {
            var request = new RestRequest(ruta, Method.Put);
            if (data != null)
                request.AddBody(data);
            //if (!string.IsNullOrEmpty(SesionUsuario.Token))
            //    request.AddHeader("Authorization", $"Bearer {SesionUsuario.Token}");
            var response = await _client.ExecuteAsync<TPut>(request);
            string error = ValidarRespuesta(response);
            _client.Dispose();
            return (response.Data, error);
        }

        /// <summary>
        /// Método para peticiones de tipo PATCH
        /// </summary>
        /// <typeparam name="T">Tipo de dato a recibir</typeparam>
        /// <param name="ruta">Ruta de acción en API</param>
        /// <param name="data">Datos a enviar. Puede ser null.</param>
        /// <returns>Item 1: Datos; Item 2: El error en caso de existir</returns>
        public async Task<(TPatch, string)> PatchAsync<TPatch>(string ruta, object data = null)
        {
            var request = new RestRequest(ruta, Method.Patch);
            if (data != null)
                request.AddBody(data);
            //if (!string.IsNullOrEmpty(SesionUsuario.Token))
            //    request.AddHeader("Authorization", $"Bearer {SesionUsuario.Token}");
            var response = await _client.ExecuteAsync<TPatch>(request);
            string error = ValidarRespuesta(response);
            _client.Dispose();
            return (response.Data, error);
        }

        /// <summary>
        /// Método para peticiones de tipo DELETE
        /// </summary>
        /// <typeparam name="T">Tipo de dato a recibir</typeparam>
        /// <param name="ruta">Ruta de acción en API</param>
        /// <param name="data">Datos a enviar. Puede ser null.</param>
        /// <returns>Item 1: Datos; Item 2: El error en caso de existir</returns>
        public async Task<(TDelete, string)> DeleteAsync<TDelete>(string ruta)
        {
            var request = new RestRequest(ruta, Method.Delete);
            //if (!string.IsNullOrEmpty(SesionUsuario.Token))
            //    request.AddHeader("Authorization", $"Bearer {SesionUsuario.Token}");
            var response = await _client.ExecuteAsync<TDelete>(request);
            string error = ValidarRespuesta(response);
            _client.Dispose();
            return (response.Data, error);
        }

        public async Task<(TPost, string)> LoginAsync<TPost>(string ruta, IList<KeyValuePair<string, string>> data)
        {
            var request = new RestRequest(ruta, Method.Post);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", $"username={data[0].Value}&password={data[1].Value}&client_id={data[2].Value}&grant_type={data[3].Value}", ParameterType.RequestBody);
            var response = await _client.ExecuteAsync<TPost>(request);
            string error = string.Empty;
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                error = response.Content.ToString();
            }
            _client.Dispose();
            return (response.Data, error);
        }

        private string ValidarRespuesta(RestResponse response)
        {
            if (response.StatusCode == HttpStatusCode.Unauthorized)
                return "No cuenta con los permisos para ejecutar esta acción.";
            if (response.StatusCode == HttpStatusCode.InternalServerError)
            {
                if (string.IsNullOrEmpty(response.Content))
                    return "No se ha encontrado el recurso";
                var textoError = JsonSerializer.Deserialize<ErrorResponse>(response.Content);
                return textoError.Message;
            }
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                if (string.IsNullOrEmpty(response.Content))
                    return "No se ha encontrado el recurso";
                var textoError = JsonSerializer.Deserialize<ErrorResponse>(response.Content);
                return textoError.Message;
            }
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                if (string.IsNullOrEmpty(response.Content))
                    return "No se pudo ejecutar la acción solicitada.";
                var textoError = JsonSerializer.Deserialize<ErrorResponse>(response.Content);
                return textoError.Message;
            }
            if (response.StatusCode == HttpStatusCode.OK)
                return string.Empty;
            if (response.StatusCode == HttpStatusCode.MethodNotAllowed)
                return "Método no permitido, verifique las acciones HTTP.";
            if (response.StatusCode == HttpStatusCode.RequestTimeout)
                return "La operación no pudo terminar a tiempo, intente nuevamente.";
            if (response.StatusCode == 0)
                return "No hubo comunicación con el servidor, verificar conexión.";
            return string.Empty;
        }
    }
}
