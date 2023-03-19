
/*
test data
insert into tbl_mybook values('38d44dba-910a-49cb-88b0-440353164777', '31a1c45d-4026-4533-a63d-b44d58408556', 'testbook1', 'testboo1 contents', '["author1", "author2"]', '["trans1", "trans2"]', 'publisher1', 'thumbnail url', '00000000', 0, 512, '["image1", "image2"]', false, false, '{}', now(), now(), null);
insert into tbl_mybook values('4b4acc85-c0de-41ed-8077-fa9d8a1807e9', '31a1c45d-4026-4533-a63d-b44d58408556', 'testbook2', 'testboo2 contents', '["author2-1", "author2-2"]', '["trans2-1", "trans2-2"]', 'publisher2', 'thumbnail url 2', '11111111', 0, 600, '["image2-1", "image2-2"]', false, false, '{}', now(), now(), null);
insert into tbl_mybook values('84e65492-0bc3-4507-9f14-36edf07ba9a0', '31a1c45d-4026-4533-a63d-b44d58408556', 'testbook2', 'testboo2 contents', '["author3-1", "author3-2"]', '["trans3-1", "trans3-2"]', 'publisher3', 'thumbnail url 3', '22222222', 0, 812, '["image3-1", "image3-2"]', false, false, '{}', now(), now(), null);
*/
exports.up = (knex) => {
    return knex.schema.dropTableIfExists('tbl_mybook').createTable('tbl_mybook', (table)=>{
        table.uuid('id').notNullable().primary().index('tbl_mybook_id_index')
        table.uuid('user_id').notNullable().index('tbl_mybook_user_id_index')
        table.string('title', 255).notNullable()
        table.text('content')
        table.jsonb('authors').defaultTo(JSON.stringify([]))
        table.jsonb('translators').defaultTo(JSON.stringify([]))
        table.string('publisher')
        table.string('thumbnail_url')
        table.string('isbn').notNullable()
        table.integer('current_page').defaultTo(0)
        table.integer('total_page').defaultTo(1)
        table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
        table.boolean('reading').defaultTo(false)
        table.boolean('favorite').defaultTo(false).index('tbl_mybook_favorite_index')
        table.jsonb('meta').notNullable().defaultTo(JSON.stringify({}))
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
}

exports.down = (knex)=>{
    return knex.schema.dropTable('tbl_mybook')
}