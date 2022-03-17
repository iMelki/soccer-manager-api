export default class SetPlayerForSaleRequest {
  constructor(
    public readonly price: number,
    public readonly playerId: number,
  ) {}

  toString() {
    return JSON.stringify({
      playerId: this.playerId,
      price: this.price,
    });
  }
}
