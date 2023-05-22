import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './repository/role.repository';
import { RoleEntity } from './entities/role.entity';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleRepository,
    {
      provide: Object,
      useValue: RoleEntity,
    },
  ],
  exports: [RolesService, RoleRepository],
})
export class RolesModule {}
