import { FilterDef } from '@mikro-orm/core/typings';

export const NotSoftDelete: FilterDef = {
  name: 'NotSoftDelete',
  cond: () => ({ deletedAt: null }),
  default: true,
};
