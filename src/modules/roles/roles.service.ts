import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';
import { RoleEntity } from './entities/role.entity';
import { FilterQuery, wrap } from '@mikro-orm/core';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}

  async create(data: CreateRoleDto) {
    await this.isExistThrow(data.name);
    const role = new RoleEntity(data);
    return this.repository.save(role);
  }

  async isExistThrow(name: string, except?: string) {
    const where: FilterQuery<RoleEntity> = { name };
    if (except) {
      where.id = { $ne: except };
    }
    const found = await this.repository.findOne(where, {
      filters: { NotSoftDelete: false },
    });
    if (found) throw new BadRequestException('Role already exists');
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.findOneOrThrow(id);
  }

  async update(id: string, data: UpdateRoleDto) {
    if (data.name) {
      await this.isExistThrow(data.name, id);
    }

    const role = await this.findOneOrThrow(id);
    wrap(role).assign(data);
    return role;
  }

  async remove(id: string) {
    const role = await this.findOneOrThrow(id);
    await this.repository.softDelete(role);
    return true;
  }

  async findOneOrThrow(id: string) {
    const found = await this.repository.findOne({ id });
    if (!found) throw new NotFoundException('Role not found');
    return found;
  }
}
