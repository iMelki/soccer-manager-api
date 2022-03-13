import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTeamPlayer1647196713977 implements MigrationInterface {
    name = 'UserTeamPlayer1647196713977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."players_position_enum" AS ENUM('Goalkeeper', 'Defender', 'Midfielder', 'Attacker')`);
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "first" character varying(64) NOT NULL, "last" character varying(64) NOT NULL, "age" integer NOT NULL, "country" character varying(64) NOT NULL, "position" "public"."players_position_enum" NOT NULL DEFAULT 'Goalkeeper', "value" integer NOT NULL, "teamId" integer, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "verified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d1803064187c8f38e57a9c4984c" UNIQUE ("teamId")`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "country" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "budget" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d1803064187c8f38e57a9c4984c" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_ecaf0c4aabc76f1a3d1a91ea33c" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_ecaf0c4aabc76f1a3d1a91ea33c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d1803064187c8f38e57a9c4984c"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "budget"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d1803064187c8f38e57a9c4984c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "verified" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TYPE "public"."players_position_enum"`);
    }

}
