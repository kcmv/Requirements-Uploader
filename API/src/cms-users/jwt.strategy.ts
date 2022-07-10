
import * as dotenv from 'dotenv';
dotenv.config();
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { CMSUserRepository } from './cms-users.repository';
import { JwtPayload } from './jwt-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(CMSUserRepository)
        private cmsRepository: CMSUserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET
        });
    }

    async validate(payload: JwtPayload) {
        const emp = await this.cmsRepository.findOne({id: payload.user})
        if (!emp) {
            throw new UnauthorizedException()
        }

        return emp
    }

}