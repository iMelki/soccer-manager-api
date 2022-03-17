import PlayerEntity from '@v1/players/entities/player.entity';

export default class SetPlayerForSale {
  constructor(public readonly price?: number, public readonly player?: PlayerEntity) {}

  toString() {
    return JSON.stringify({
      player: this.player,
      price: this.price,
    });
  }
}
