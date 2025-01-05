export default class Crud<T extends Record<string, unknown>> {
  constructor(private model: any) {
    this.model = model;
  }

  async findMany(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: string): Promise<T> {
    return await this.model.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(data: T): Promise<T> {
    return await this.model.create({
      data,
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.model.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: string): Promise<void> {
    return await this.model.delete({
      where: {
        id: id,
      },
    });
  }
}
