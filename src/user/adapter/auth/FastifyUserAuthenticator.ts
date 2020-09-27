import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyAuthenticator } from '../../../layer-modules/server/adapter';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../domain';
import { UserRole } from '../../domain/model/UserRole';
import { injectable } from 'inversify';

@injectable()
export class FastifyUserAuthenticator extends FastifyAuthenticator<User> {
  public async authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
    roles?: UserRole[],
  ): Promise<User | null> {
    const user: User | null = await super.authenticate(request, reply);

    if (user !== null && roles !== undefined) {
      for (const role of roles) {
        if (!user.roles.some((userRole: UserRole) => userRole === role)) {
          await reply.code(StatusCodes.FORBIDDEN).send({
            message: 'This user is not granted to perform this operation',
          });

          return null;
        }
      }
    }

    return user;
  }
}
