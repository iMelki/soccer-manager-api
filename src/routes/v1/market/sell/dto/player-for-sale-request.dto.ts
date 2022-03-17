export default class SetPlayerForSaleRequest {
  token: string | undefined;

  userId?: number;

  playerId: number | undefined;

  price: number = 0;
}
