import { FilterDef } from '@mikro-orm/core/typings';

export const NotSoftDelete: FilterDef = {
  name: 'NotSoftDelete',
  cond: (args) => ({ deletedAt: { $ne: null } }),
  default: true,
};
