import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614204291111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "surveys",
          columns: [
            {
                name: "id",
                type: "uuid",
                isPrimary: true,
                isNullable: false,
              },
              {
                name: "title",
                type: "varchar",
                isNullable: false,
              },
              {
                name: "description",
                type: "varchar",
                isNullable: false,
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("surveys");
    }

}
