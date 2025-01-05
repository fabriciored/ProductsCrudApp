export default class Crud<T extends Record<string, unknown>> {
  constructor(private model: any) {
    this.model = model;
  }

  async findMany(skip: number, take: number): Promise<{
    data: T[],
    totalCount: number,
    totalPages: number,
    currentPage: number,
  }> {
    const totalCount = await this.model.count();
    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.ceil(skip / take) + 1;
    const list = await this.model.findMany({
      orderBy: {
        price: 'asc', 
      },
      skip: skip,
      take: take,
    });

    return {
      data: list,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
    };
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
