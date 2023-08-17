import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, name: user.name, email: user.email };

    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
