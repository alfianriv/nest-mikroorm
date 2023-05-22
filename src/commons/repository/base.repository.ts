import { EntityName, wrap } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T extends object> extends EntityRepository<T> {
  constructor(em: EntityManager, entity: EntityName<T>) {
    super(em, entity);
  }

  async softDelete(entity: any): Promise<void> {
    wrap(entity).assign({ deletedAt: new Date() });
    await this.em.persist(entity);
    return entity;
  }
}
