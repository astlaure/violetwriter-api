import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  async deserializeUser(
    payload: number,
    done: (err: Error, payload: User) => void,
  ): Promise<any> {
    const user = await this.userService.findByID(payload);
    done(null, user);
  }
}
