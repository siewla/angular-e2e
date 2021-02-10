export class InsuranceData {
  private name: string;
  private agent: string;
  private dateActivated: Date;

  constructor(name: string, agent: string, dateActivated: Date) {
    this.name = name;
    this.agent = agent;
    this.dateActivated = dateActivated;
  }

  getName(): string {
    return this.name;
  }

  getAgent(): string {
    return this.agent;
  }

  getActivationDate(): Date {
    return this.dateActivated;
  }
}
