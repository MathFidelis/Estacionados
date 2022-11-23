import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669218526070 implements MigrationInterface {
    name = 'default1669218526070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "class" TO "is_temporary_employee"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_temporary_employee"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_temporary_employee" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_temporary_employee"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_temporary_employee" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "is_temporary_employee" TO "class"`);
    }

}
