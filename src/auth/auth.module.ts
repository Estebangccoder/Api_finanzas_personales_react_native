import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwtstrategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })

  ],
  exports:[JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
