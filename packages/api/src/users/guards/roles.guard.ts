import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Role } from '../entities/user.entity'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../users.service'
import { ROLES_KEY } from '../decorators/role.decorator'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error('Method not implemented.')
    }

  async CanActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) throw new Error('No roles defined')

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req

    const { role } = await this.usersService.findOneByUid(user.uid)

    return requiredRoles.includes(role)
  }
}
