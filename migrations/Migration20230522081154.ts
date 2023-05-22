import { Migration } from '@mikro-orm/migrations';

export class Migration20230522081154 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint "Users_pkey" primary key ("id"));');
    this.addSql('create index "Users_created_at_index" on "Users" ("created_at");');
    this.addSql('create index "Users_updated_at_index" on "Users" ("updated_at");');
    this.addSql('create index "Users_deleted_at_index" on "Users" ("deleted_at");');
    this.addSql('create index "Users_username_index" on "Users" ("username");');
    this.addSql('alter table "Users" add constraint "Users_username_unique" unique ("username");');
    this.addSql('create index "Users_email_index" on "Users" ("email");');
    this.addSql('alter table "Users" add constraint "Users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "Users" cascade;');
  }

}
