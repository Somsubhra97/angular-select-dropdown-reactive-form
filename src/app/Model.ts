export class Model {
  constructor(
    public name: string,
    public city: string,
    public region: string
  ) {}
}

export interface IModel {
  name: string;
  city: string;
  region: string;
}
