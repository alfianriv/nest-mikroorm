import { BaseRepository } from '~/src/commons/repository/base.repository';
import { RoleEntity } from '../entities/role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {}
