import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitialTables1627052873658 implements MigrationInterface {
    name = 'CreateInitialTables1627052873658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(120) NOT NULL, `username` varchar(120) NOT NULL, `password` varchar(120) NOT NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tasks` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `priority` enum ('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium', `description` text NOT NULL, `timer` int NOT NULL DEFAULT '0', `done` tinyint NOT NULL DEFAULT 0, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tasks` ADD CONSTRAINT `FK_166bd96559cb38595d392f75a35` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` DROP FOREIGN KEY `FK_166bd96559cb38595d392f75a35`");
        await queryRunner.query("DROP TABLE `tasks`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
