import FetchApi from "./fetch";

export class ApiService<T extends Record<string, unknown>> extends FetchApi {
    private url: string;

    constructor(url: string) {
      super();
      this.url = url;
    }
  
    public async getAll(take: number, skip:number): Promise<{
      data: T[],
      totalCount: number,
      totalPages: number,
      currentPage: number,
    }> {
      this.setMethod("GET")
      const response = await this.execute(`${this.url}?take=${take}&skip=${skip}`);
      return response;
    }
  
    public async getById(id: string): Promise<T> {
      this.setMethod("GET")
      const response = await this.execute(`${this.url}?id=${id}`);
      return response;
    }
  
    public async create(data: T): Promise<T> {
      this.setMethod("POST")
      const response = await this.execute(this.url, data);
      return response;
    }
  
    public async update(id: string, data: T): Promise<T> {
      this.setMethod("PUT")
      const response = await this.execute(`${this.url}?id=${id}`, data);
      return response;
    }
  
    public async delete(id: string): Promise<void> {
      this.setMethod("DELETE")
      await this.execute(`${this.url}?id=${id}`);
    }
  
  
  }
  