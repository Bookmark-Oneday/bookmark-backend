/*
Test accounts
insert into tbl_account values('31a1c45d-4026-4533-a63d-b44d58408556','test1','test1-1','nickname1','test1@email.com','010-1235-5678','KR','google','72be7001-1711-4f01-bbfd-ecaf5d90832f',null,7200,null,false,null,false,null,null,'[]','{}',now(),now(),null);
insert into tbl_account values('db77428c-0e01-49be-bcfe-e3f30361e72b','test2','test2-1','nickname2','test2@email.com','210-1235-5678','KR','google','1ded124b-af4a-4306-8c3e-4c781b925d76',null,3600,null,false,null,false,null,null,'[]','{}',now(),now(),null);
insert into tbl_account values('47ac1567-b916-4947-b9e5-4ae4f849af73','test3','test3-1','nickname3','test3@email.com','310-1235-5678','KR','google','618f40a7-aa47-4d46-b40e-47bc9fc256a4',null,7200,null,false,null,false,null,null,'[]','{}',now(),now(),null);
*/


exports.up = (knex) => {
    return knex.schema.dropTableIfExists('tbl_account').createTable('tbl_account', (table)=>{
        table.uuid('id').notNullable().primary().index('tbl_account_id_index')
        table.string('firstname', 50)
        table.string('lastname', 50)
        table.string('nickname', 50)
        table.string('email', 64)
        table.string('mobile', 64)
        table.string('country', 2).defaultTo('KR')
        table.string('oauth_type', 16).notNullable().index('tbl_account_oauth_type_index')
        table.string('oauth_id', 512).index('tbl_account_oauth_id_index')
        table.string('pin', 64).defaultTo('0000')
        table.integer('target_read_time').notNullable().defaultTo(3600)
        table.timestamp('pin_created_at')
        table.boolean('email_verification').defaultTo(false)
        table.timestamp('email_verification_date')
        table.boolean('age_verification').defaultTo(false)
        table.timestamp('age_verification_date')
        table.string('profile_image_url', 2048)
        table.jsonb('bg_image_urls', 2048).notNullable().defaultTo(JSON.stringify([]))
        table.jsonb('meta').notNullable().defaultTo(JSON.stringify({}))
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
}

exports.down = (knex)=>{
    return knex.schema.dropTable('tbl_account')
}