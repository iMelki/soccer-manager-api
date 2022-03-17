export default class PlayerBuyDto {
  constructor(
    public readonly transferId?: number,
    public readonly buyerToken?: string,
  ) {}

  toString() {
    return JSON.stringify({
      transferId: this.transferId,
      buyerToken: this.buyerToken,
    });
  }
}
