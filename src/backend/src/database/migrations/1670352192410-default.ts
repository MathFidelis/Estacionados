import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670352192410 implements MigrationInterface {
    name = 'default1670352192410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "cpf" character varying NOT NULL, "identity_number" character varying NOT NULL, "date_of_birth" date NOT NULL, "type_of_driver_license" character varying NOT NULL, "is_temporary_employee" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_of_service" ("id" uuid NOT NULL, "vehicle_plate" character varying NOT NULL, "vehicle_color" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "accepted_at" TIMESTAMP, "linked_at" TIMESTAMP, "finished_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_5f5e82e5e9702e4c7010017ef17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_of_service" ADD CONSTRAINT "FK_cccfdf400e8e71a002f25d84b5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_of_service" DROP CONSTRAINT "FK_cccfdf400e8e71a002f25d84b5d"`);
        await queryRunner.query(`DROP TABLE "order_of_service"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
