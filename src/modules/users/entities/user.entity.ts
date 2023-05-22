import {
  Entity,
  EntityRepositoryType,
  Filter,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/commons/base/base.entity';
import { NotSoftDelete } from 'src/commons/filter/not-soft-delete.filter';
import { v4 } from 'uuid';
import { UserRepository } from '../repository/user.repository';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity({ tableName: 'Users', customRepository: () => UserRepository })
@Filter(NotSoftDelete)
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryKey({ primary: true })
  id: string = v4();

  @Property({ unique: true, index: true })
  username: string;

  @Property({ unique: true, index: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @ManyToOne(() => RoleEntity, { name: 'roleId' })
  role?: RoleEntity;

  [EntityRepositoryType]?: UserRepository;
}
