import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1647164850018 implements MigrationInterface {
    name = 'FirstMigration1647164850018'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "verified" boolean NOT NULL, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TYPE "public"."users_role_enum" AS ENUM(\'admin\', \'user\')');
      await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "verified" boolean NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT \'user\', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"');
      await queryRunner.query('DROP TABLE "users"');
      await queryRunner.query('DROP TYPE "public"."users_role_enum"');
      await queryRunner.query('DROP TABLE "teams"');
    }
}
