import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669217187383 implements MigrationInterface {

	name = "default1669217187383";

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query("CREATE TABLE \"valet\" (\"id\" uuid NOT NULL, \"first_name\" character varying NOT NULL, \"last_name\" character varying NOT NULL, \"cpf\" character varying NOT NULL, \"identity_number\" character varying NOT NULL, \"date_of_birth\" date NOT NULL, \"type_of_driver_license\" character varying NOT NULL, \"class\" character varying NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_bba9baef4e74fd09068a82005e4\" PRIMARY KEY (\"id\"))");
	
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query("DROP TABLE \"valet\"");
	
	}

}
