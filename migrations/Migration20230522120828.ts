import { Migration } from '@mikro-orm/migrations';

export class Migration20230522120828 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Roles" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "description" varchar(255) null, constraint "Roles_pkey" primary key ("id"));');
    this.addSql('create index "Roles_created_at_index" on "Roles" ("created_at");');
    this.addSql('create index "Roles_updated_at_index" on "Roles" ("updated_at");');
    this.addSql('create index "Roles_deleted_at_index" on "Roles" ("deleted_at");');
    this.addSql('create index "Roles_name_index" on "Roles" ("name");');

    this.addSql('alter table "Users" add column "roleId" varchar(255) not null;');
    this.addSql('alter table "Users" add constraint "Users_roleId_foreign" foreign key ("roleId") references "Roles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "Users" drop constraint "Users_roleId_foreign";');

    this.addSql('drop table if exists "Roles" cascade;');

    this.addSql('alter table "Users" drop column "roleId";');
  }

}
