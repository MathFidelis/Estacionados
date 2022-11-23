import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669218259935 implements MigrationInterface {
    name = 'default1669218259935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "identity_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_of_birth" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type_of_driver_license" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "class" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "class"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type_of_driver_license"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "identity_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
    }

}
