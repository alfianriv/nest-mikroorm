import {
  Entity,
  EntityRepositoryType,
  Filter,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/commons/base/base.entity';
import { NotSoftDelete } from 'src/commons/filter/not-soft-delete.filter';
import { v4 } from 'uuid';
import { UserRepository } from '../repository/users.repository';

@Entity({ tableName: 'Users', customRepository: () => UserRepository })
@Filter(NotSoftDelete)
export class UserEntity extends BaseEntity {
  @PrimaryKey({ primary: true })
  id: string = v4();

  @Property({ unique: true, index: true })
  username: string;

  @Property({ unique: true, index: true })
  email: string;

  @Property()
  password: string;

  [EntityRepositoryType]?: UserRepository;
}
