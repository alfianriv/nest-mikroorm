import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, RolesModule],
})
export class ModulesModule {}
