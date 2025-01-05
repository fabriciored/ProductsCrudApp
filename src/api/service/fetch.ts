abstract class FetchApi {
  protected headers: Headers = new Headers();
  protected method: "POST" | "GET" | "PUT" | "DELETE" = "POST";

  constructor() {
    this.headers.append("Content-Type", "application/json");
  }

  public setMethod(method: "POST" | "GET" | "PUT" | "DELETE"): FetchApi {
    this.method = method;
    return this;
  }

  public setHeaders(headers: Headers): FetchApi {
    this.headers = headers;
    return this;
  }

  public setHeader(key: string, value: string): FetchApi {
    this.headers.append(key, value);
    return this;
  }

  public getHeaders(): Headers {
    return this.headers;
  }

  public getMethod(): "POST" | "GET" | "PUT" | "DELETE" {
    return this.method;
  }

  public setToken(token: string): void {
    this.setHeader("Authorization", `Bearer ${token}`);
  }

  protected async execute<TResponse = any, TBody = any, TQuery = any>(
    url: string,
    body?: TBody,
    query?: TQuery
  ): Promise<TResponse> {
    const response = await fetch(`${url}${new URLSearchParams(query ?? "")}`, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }
}

export default FetchApi;