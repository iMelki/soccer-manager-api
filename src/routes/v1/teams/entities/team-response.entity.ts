import SingleResponseEntity from '@responses/single-entity-response.entity';

export default class TeamResponseEntity extends SingleResponseEntity {
  id: number = 0;

  name: string = '';

  country: string = '';

  value: number = 0;

  budget: number = 0;
}
