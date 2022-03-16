import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtDecodeResponse } from '@interfaces/jwt-decode-response.interface';
import { RolesEnum } from '@decorators/roles.decorator';

@Injectable()
export default class OwnershipGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const tokenData = (await this.jwtService
      .decode(request.headers.authorization?.split('Bearer')[1].trim() as string) as JwtDecodeResponse | null);
    if (!tokenData) return false;
    if (tokenData?.role === RolesEnum.admin) {
      return true;
    }
    return tokenData?.id === Number(request.params?.id);
  }
}
