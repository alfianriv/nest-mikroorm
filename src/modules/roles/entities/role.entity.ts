import {
  Entity,
  EntityRepositoryType,
  Filter,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '~/src/commons/base/base.entity';
import { v4 } from 'uuid';
import { RoleRepository } from '../repository/role.repository';
import { NotSoftDelete } from '~/src/commons/filter/not-soft-delete.filter';

@Entity({ tableName: 'Roles', customRepository: () => RoleRepository })
@Filter(NotSoftDelete)
export class RoleEntity extends BaseEntity {
  constructor(partial: Partial<RoleEntity>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryKey({ primary: true })
  id: string = v4();

  @Property({ unique: true, index: true })
  name: string;

  @Property({ nullable: true })
  description?: string;

  [EntityRepositoryType]?: RoleRepository;
}
