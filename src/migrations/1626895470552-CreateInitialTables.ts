import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitialTables1626895470552 implements MigrationInterface {
    name = 'CreateInitialTables1626895470552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tasks` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `priority` enum ('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium', `description` text NOT NULL, `timer` int NOT NULL DEFAULT '0', `done` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(120) NOT NULL, `username` varchar(120) NOT NULL, `password` varchar(120) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `tasks`");
    }

}
