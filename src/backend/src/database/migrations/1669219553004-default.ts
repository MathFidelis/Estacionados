import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669219553004 implements MigrationInterface {
    name = 'default1669219553004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_of_service" ("id" uuid NOT NULL, "vehicle_plate" character varying NOT NULL, "vehicle_color" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "accepted_at" date NOT NULL, "finished_at" date NOT NULL, CONSTRAINT "PK_5f5e82e5e9702e4c7010017ef17" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_of_service"`);
    }

}
