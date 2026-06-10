import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const user = this.userRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    });
    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    };
  }

  async getUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    };
  }
}