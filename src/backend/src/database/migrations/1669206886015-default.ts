import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669206886015 implements MigrationInterface {

	name = "default1669206886015";

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query("CREATE TABLE \"user\" (\"id\" uuid NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"role\" character varying NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))");
	
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query("DROP TABLE \"user\"");
	
	}

}
