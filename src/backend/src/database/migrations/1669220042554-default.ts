import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669220042554 implements MigrationInterface {
    name = 'default1669220042554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_of_service" ("id" uuid NOT NULL, "vehicle_plate" character varying NOT NULL, "vehicle_color" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "accepted_at" TIMESTAMP NOT NULL, "finished_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_5f5e82e5e9702e4c7010017ef17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_of_service" ADD CONSTRAINT "FK_cccfdf400e8e71a002f25d84b5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_of_service" DROP CONSTRAINT "FK_cccfdf400e8e71a002f25d84b5d"`);
        await queryRunner.query(`DROP TABLE "order_of_service"`);
    }

}
