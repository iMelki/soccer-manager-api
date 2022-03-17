export default class OrderCreatedEvent {
  constructor(
    public readonly token: string,
    public readonly userId: string,
    public readonly price: number,
    public readonly playerId: number,
  ) {}

  toString() {
    return JSON.stringify({
      token: this.token,
      playerId: this.playerId,
      userId: this.userId,
      price: this.price,
    });
  }
}
