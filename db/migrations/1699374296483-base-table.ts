import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseTable1699374296483 implements MigrationInterface {
    name = 'BaseTable1699374296483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" uuid NOT NULL, "receiver_id" uuid, "group_id" uuid, "media_id" uuid, CONSTRAINT "REL_7d3846d3e3d5fd07241e1aebff" UNIQUE ("media_id"), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "refresh_token" character varying, "avatar" character varying, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "media_id" uuid, CONSTRAINT "REL_049edb1ce7ab3d2a98009b171d" UNIQUE ("media_id"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."media_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "type" "public"."media_type_enum" NOT NULL, "post_id" uuid, "comment_id" uuid, "message_id" uuid, CONSTRAINT "REL_20dc152fa567df67110b94d6f1" UNIQUE ("post_id"), CONSTRAINT "REL_06df0ecbcc0ce3e024007aef72" UNIQUE ("comment_id"), CONSTRAINT "REL_a33f77c90759d1f2c799941e7d" UNIQUE ("message_id"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" uuid NOT NULL, "user_id" uuid NOT NULL, "media_id" uuid, "replied_comment_id" uuid, CONSTRAINT "REL_64555a834f96e9d38fd8a47908" UNIQUE ("media_id"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_groups" ("group_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c95039f66f5d7a452fc53945bfe" PRIMARY KEY ("group_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c5f2c23c34f3921fbad2cd394" ON "user_groups" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_95bf94c61795df25a515435010" ON "user_groups" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "post_tags" ("tag_id" uuid NOT NULL, "post_id" uuid NOT NULL, CONSTRAINT "PK_deee54a40024b7afc16d25684f8" PRIMARY KEY ("tag_id", "post_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_192ab488d1c284ac9abe2e3035" ON "post_tags" ("tag_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5df4e8dc2cb3e668b962362265" ON "post_tags" ("post_id") `);
        await queryRunner.query(`CREATE TABLE "user_history_tags" ("tag_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8c0d4445aaf3dd9f223e8a66a5c" PRIMARY KEY ("tag_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c6cc13b8bf13eb422c6755a28" ON "user_history_tags" ("tag_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5aff3d563c39be313062126d06" ON "user_history_tags" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_friends" ("user_id" uuid NOT NULL, "friend_id" uuid NOT NULL, CONSTRAINT "PK_657d2355d5000f103ff3612447f" PRIMARY KEY ("user_id", "friend_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73aac2cba30951ed7c7000c614" ON "user_friends" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_24f1e41a3801477d44228395e3" ON "user_friends" ("friend_id") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_f4da40532b0102d51beb220f16a" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_840551c7b5a3b5eda2e9b099ef4" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7d3846d3e3d5fd07241e1aebff5" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_049edb1ce7ab3d2a98009b171d0" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_20dc152fa567df67110b94d6f16" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_06df0ecbcc0ce3e024007aef72f" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_a33f77c90759d1f2c799941e7db" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_64555a834f96e9d38fd8a479083" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3afd85332244fa4ce1a21720e08" FOREIGN KEY ("replied_comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_groups" ADD CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_groups" ADD CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_192ab488d1c284ac9abe2e30356" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_5df4e8dc2cb3e668b962362265d" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_history_tags" ADD CONSTRAINT "FK_7c6cc13b8bf13eb422c6755a287" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_history_tags" ADD CONSTRAINT "FK_5aff3d563c39be313062126d06f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_73aac2cba30951ed7c7000c6142" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_24f1e41a3801477d44228395e3b" FOREIGN KEY ("friend_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_24f1e41a3801477d44228395e3b"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_73aac2cba30951ed7c7000c6142"`);
        await queryRunner.query(`ALTER TABLE "user_history_tags" DROP CONSTRAINT "FK_5aff3d563c39be313062126d06f"`);
        await queryRunner.query(`ALTER TABLE "user_history_tags" DROP CONSTRAINT "FK_7c6cc13b8bf13eb422c6755a287"`);
        await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_5df4e8dc2cb3e668b962362265d"`);
        await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_192ab488d1c284ac9abe2e30356"`);
        await queryRunner.query(`ALTER TABLE "user_groups" DROP CONSTRAINT "FK_95bf94c61795df25a5154350102"`);
        await queryRunner.query(`ALTER TABLE "user_groups" DROP CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3afd85332244fa4ce1a21720e08"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_64555a834f96e9d38fd8a479083"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_a33f77c90759d1f2c799941e7db"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_06df0ecbcc0ce3e024007aef72f"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_20dc152fa567df67110b94d6f16"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_049edb1ce7ab3d2a98009b171d0"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7d3846d3e3d5fd07241e1aebff5"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_840551c7b5a3b5eda2e9b099ef4"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_f4da40532b0102d51beb220f16a"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24f1e41a3801477d44228395e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73aac2cba30951ed7c7000c614"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5aff3d563c39be313062126d06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c6cc13b8bf13eb422c6755a28"`);
        await queryRunner.query(`DROP TABLE "user_history_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5df4e8dc2cb3e668b962362265"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_192ab488d1c284ac9abe2e3035"`);
        await queryRunner.query(`DROP TABLE "post_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95bf94c61795df25a515435010"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c5f2c23c34f3921fbad2cd394"`);
        await queryRunner.query(`DROP TABLE "user_groups"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
