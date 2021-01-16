import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1610808710512 implements MigrationInterface {
  name = 'init1610808710512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bus" (
          "id" SERIAL NOT NULL,
          "ident" character varying NOT NULL,
          CONSTRAINT "UQ_467aa6b937304851562fe6e278a" UNIQUE ("ident"),
          CONSTRAINT "PK_bd7b8b319eb7958e876584d02d5" PRIMARY KEY ("id")
          )`,
    );
    await queryRunner.query(
      `CREATE TABLE "point" (
          "id" SERIAL NOT NULL,
          "lat" real NOT NULL,
          "lon" real NOT NULL,
          "speed" integer,
          "device_timestamp" TIMESTAMP NOT NULL,
          "server_timestamp" TIMESTAMP NOT NULL,
          "direction" integer NOT NULL,
          "bus_id" integer,
          CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id")
          )`,
    );
    await queryRunner.query(
      `ALTER TABLE "point" ADD CONSTRAINT "FK_7df2d316f222ccd832cedeecc4b" FOREIGN KEY ("bus_id") REFERENCES "bus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "point" DROP CONSTRAINT "FK_7df2d316f222ccd832cedeecc4b"`,
    );
    await queryRunner.query(`DROP TABLE "point"`);
    await queryRunner.query(`DROP TABLE "bus"`);
  }
}
