import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transfer1647528786309 implements MigrationInterface {
    name = 'Transfer1647528786309'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "transfers" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "playersId" integer, CONSTRAINT "REL_2ae337ac8067fff1f228193ec8" UNIQUE ("playersId"), CONSTRAINT "PK_f712e908b465e0085b4408cabc3" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "transfers" ADD CONSTRAINT "FK_2ae337ac8067fff1f228193ec82" FOREIGN KEY ("playersId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "transfers" DROP CONSTRAINT "FK_2ae337ac8067fff1f228193ec82"');
      await queryRunner.query('DROP TABLE "transfers"');
    }
}
