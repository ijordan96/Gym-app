import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private adminsService: AdminsService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<{accessToken : string}> {
    const user = await this.adminsService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.phoneNumber, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
