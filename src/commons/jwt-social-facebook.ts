import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
export class JwtFacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID, //
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/facebook',
      scope: ['public_profile', 'email'],
      profileFields: ['id', 'email'],
      prompt: 'consent',
    });
  }

  validate(accessToken, refreshToken, public_profile) {
    return {
      email: public_profile.emails[0].value,
      password: 'Qwer1234!!',
    };
  }
}
