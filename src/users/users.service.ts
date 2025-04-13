import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'node:crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create({ username, password, email }: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: createHash('sha256').update(password).digest('hex'),
      },
      omit: {
        password: true,
      },
    });

    const payload = { sub: user.id, username: user.username };
    return {
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  async login({ username, password: pass }: LoginUserDto) {
    const user = await this.prismaService.user.findUniqueOrThrow({ where: { username } });
    if (createHash('sha256').update(pass).digest('hex') !== user.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id }, omit: { password: true } });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id }, omit: { password: true } });
  }
}
