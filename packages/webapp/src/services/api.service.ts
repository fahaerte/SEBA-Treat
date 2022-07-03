class ApiService {
  // TODO: in env
  private static BASE_URL = "http://localhost:5000/api";

  private static BEARER =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjQ1NzdlNzJkNWZjNTJlMjUwMTM0MSIsImlhdCI6MTY1NjU2ODk0OCwiZXhwIjoxNjU2NjU1MzQ4fQ.THx6kttTiE_aaW02eYSm67SnIrWadWy0zcCOhqlvvDg";

  private static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ApiService.BEARER}`,
  };

  public static getImage = async (url: string): Promise<Response> => {
    const response = await fetch(`${ApiService.BASE_URL}${url}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${ApiService.BEARER}`,
      },
    });
    return response;
  };

  public static get = async (url: string): Promise<Response> => {
    return await fetch(`${ApiService.BASE_URL}${url}`, {
      method: "GET",
      mode: "cors",
      headers: ApiService.headers,
    });
  };

  public static post = async (
    url: string,
    data: any
  ): Promise<Response | Error> => {
    return await ApiService.requestWithBody("POST", url, data);
  };

  public static patch = async (url: string, data: any): Promise<Response> => {
    return await ApiService.requestWithBody("PATCH", url, data);
  };

  private static requestWithBody = async (
    method: string,
    url: string,
    data: any
  ): Promise<Response> => {
    return await fetch(`${ApiService.BASE_URL}${url}`, {
      method: method,
      mode: "cors",
      headers: ApiService.headers,
      body: JSON.stringify(data),
    });
  };
}

export default ApiService;
