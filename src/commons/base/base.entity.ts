import { Property } from '@mikro-orm/core';

export class BaseEntity {
  @Property({ type: 'timestamptz', index: true })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date(), index: true })
  updatedAt: Date = new Date();

  @Property({ type: 'timestamptz', nullable: true, index: true })
  deletedAt?: Date;
}
