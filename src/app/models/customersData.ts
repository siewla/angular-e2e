export class CustomersData {
  private name: string;
  private insurances: [];

  constructor(name: string, insurances: []) {
    this.name = name;
    this.insurances = insurances;
  }

  getName(): string {
    return this.name;
  }

  getInsurances(): [] {
    return this.insurances;
  }
}
