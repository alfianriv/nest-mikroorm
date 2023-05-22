import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entities/user.entity';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { hashPassword } from '~/src/commons/helper/password-hash';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleService: RolesService,
  ) {}

  async create(data: CreateUserDto) {
    await this.isUsernameExistThrow(data.username);
    await this.isEmailExistThrow(data.email);
    data.password = hashPassword(data.password);
    const user = new UserEntity(data);
    const role = await this.roleService.findOneOrThrow(data.roleId);
    user.role = role;
    return this.repository.save(user);
  }

  async isEmailExistThrow(email: string, except?: string) {
    const where: FilterQuery<UserEntity> = { email };
    if (except) {
      where.id = {
        $ne: except,
      };
    }
    const found = await this.repository.findOne(where, {
      filters: { NotSoftDelete: false },
    });
    if (found) throw new BadRequestException('Email already exists');
  }

  async isUsernameExistThrow(username: string, except?: string) {
    const where: FilterQuery<UserEntity> = { username };
    if (except) {
      where.id = {
        $ne: except,
      };
    }
    const found = await this.repository.findOne(where, {
      filters: { NotSoftDelete: false },
    });
    if (found) throw new BadRequestException('Username already exists');
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.findOneOrThrow(id);
  }

  async findOneOrThrow(id: string) {
    const found = await this.repository.findOne({ id });
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.username) {
      await this.isUsernameExistThrow(data.username, id);
    }

    if (data.email) {
      await this.isEmailExistThrow(data.email, id);
    }

    const user = await this.findOneOrThrow(id);

    if (data.roleId) {
      const role = await this.roleService.findOneOrThrow(data.roleId);
      user.role = role;
    }

    if (data.password) {
      data.password = hashPassword(data.password);
    }

    wrap(user).assign(data);
    await this.repository.save(user);

    return user;
  }

  async remove(id: string) {
    const user = await this.findOneOrThrow(id);
    await this.repository.softDelete(user);
    return true;
  }
}
