import { Migration } from '@mikro-orm/migrations';

export class Migration20230522123625 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "Roles" add constraint "Roles_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "Roles" drop constraint "Roles_name_unique";');
  }

}
