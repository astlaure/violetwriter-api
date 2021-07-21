import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateCredentials(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Bad credentials.');
    }

    return user;
  }
}
