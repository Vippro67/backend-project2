import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    //check if user already exists
    const userExists = await this.userRepository.findOne({
      where: {
        email: registerUserDto.email,
      },
    });
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    const newUser = await this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatching = await bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    return this.generateJwtToken({ id: user.id, email: user.email });
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async generateJwtToken(payload: {
    id: number;
    email: string;
  }): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: 'refreshsecret',
      expiresIn: '7d',
    });
    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );
    return { access_token, refresh_token };
  }

  async refresh(refresh_token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: 'refreshsecret',
      });
      const user = await this.userRepository.findOneBy({
        email: payload.email,
        refresh_token: refresh_token,
      });
      if (user)
        return this.generateJwtToken({ id: user.id, email: user.email });
      else
        throw new HttpException(
          'Refresh token is not valid!',
          HttpStatus.BAD_REQUEST,
        );
    } catch (e) {
      throw new HttpException(
        'Refresh token is not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
