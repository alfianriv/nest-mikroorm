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
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async save(entity: T): Promise<T> {
    const saved = await this.em.getRepository(this.entityName).create(entity);
    await this.em.persistAndFlush(saved);
    return saved;
  }
}
