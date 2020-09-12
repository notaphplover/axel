import * as argon2 from 'argon2';
import { injectable } from 'inversify';

@injectable()
export class PasswordHasher {
  public async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
