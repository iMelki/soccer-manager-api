import { Exclude } from 'class-transformer';
import { RolesEnum } from '@decorators/roles.decorator';
// import SingleResponseEntity from '@responses/single-entity-response.entity';

export default class UserResponseEntity {
  id: number = 0;

  role: RolesEnum = RolesEnum.user;

  verified: boolean = true;

  email: string = '';

  @Exclude()
  password: string = '';
}
