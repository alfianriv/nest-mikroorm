import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    {
      provide: Object,
      useValue: UserEntity,
    },
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
