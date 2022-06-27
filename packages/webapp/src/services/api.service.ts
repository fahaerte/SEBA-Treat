class ApiService {
  // TODO: in env
  private static BASE_URL = "http://localhost:5000/api";

  private static BEARER =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjQ1NzdlNzJkNWZjNTJlMjUwMTM0MSIsImlhdCI6MTY1NjI1MDAzMiwiZXhwIjoxNjU2MzM2NDMyfQ.9WtGeiAtmH-OkbiSmhEHBS4whNfGnpCwxU_50cTDUQ8";

  private static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ApiService.BEARER}`,
  };

  public static get = async (url: string): Promise<Response | Error> => {
    const response = await fetch(`${ApiService.BASE_URL}${url}`, {
      method: "GET",
      mode: "cors",
      headers: ApiService.headers,
    });
    return await response.json();
  };

  public static post = async (
    url: string,
    data: any
  ): Promise<Response | Error> => {
    const response = await ApiService.requestWithBody("POST", url, data);
    return await response.json();
  };

  public static put = async (url: string, data: any): Promise<void | Error> => {
    await ApiService.requestWithBody("PUT", url, data);
  };

  private static requestWithBody = async (
    method: string,
    url: string,
    data: any
  ): Promise<Response | Error> => {
    return await fetch(`${ApiService.BASE_URL}${url}`, {
      method: method,
      mode: "cors",
      headers: ApiService.headers,
      body: JSON.stringify(data),
    });
  };
}

export default ApiService;
