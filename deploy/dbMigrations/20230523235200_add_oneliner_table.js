
/*
test data
INSERT INTO tbl_oneliner (id, user_id, profile_image, nickname, book_id, title, authors, oneliner, color, top, left, font, font_size, bg_image_url, meta, created_at)
VALUES 
  ('31a1c45d-4026-4533-a63d-b44d58408556', 'db77428c-0e01-49be-bcfe-e3f30361e72b', 'profile_image_1', 'nickname_1', '47ac1567-b916-4947-b9e5-4ae4f849af73', 'title_1', '["author_1"]', 'oneliner_1', 'color_1', 'top_1', 'left_1', 'font_1', 'font_size_1', 'bg_image_url_1', '{}', NOW()),
  ('6f53cfe9-2f01-4d1a-8b22-9c394d03d616', '6d26f579-225e-4c4a-879e-43b3f0730b88', 'profile_image_2', 'nickname_2', '84a3a3f1-d6db-42a3-85e9-29504097b3a4', 'title_2', '["author_2"]', 'oneliner_2', 'color_2', 'top_2', 'left_2', 'font_2', 'font_size_2', 'bg_image_url_2', '{}', NOW());

*/

exports.up = (knex) => {
    return knex.schema.dropTableIfExists('tbl_oneliner').createTable('tbl_oneliner', (table)=>{
        table.uuid('id').notNullable().primary()
        table.uuid('user_id').notNullable().index('tbl_oneliner_user_id_index')
        table.string('profile_image', 2048)
        table.string('nickname', 50)
        table.uuid('book_id').notNullable().index('tbl_oneliner_book_id_index')
        table.string('title', 255).notNullable()
        table.jsonb('authors').defaultTo(JSON.stringify([]))

        table.string('oneliner', 2048)
        table.string('color', 50)
        table.string('top', 50)
        table.string('left', 50)
        table.string('font', 50)
        table.string('font_size', 50)

        table.string('bg_image_url', 2048)
        table.jsonb('meta').notNullable().defaultTo(JSON.stringify({}))
        table.timestamp('created_at').defaultTo(knex.fn.now()).index('tbl_oneliner_created_at_index')
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
}

exports.down = (knex)=>{
    return knex.schema.dropTable('tbl_oneliner')
}