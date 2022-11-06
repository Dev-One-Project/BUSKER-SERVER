import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/context';
import { AuthService } from './\bauth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    return await this.authService.buskerLogin({
      email,
      password,
      context,
    });
  }
  @UseGuards()
  @Mutation(() => String)
  async logout(
    @Context() context: IContext, //
  ) {
    return this.authService.buskerLogout({ context });
  }
}