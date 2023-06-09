/**
 * test data
insert into tbl_myhistory values('75d332e1-3de0-44ee-95df-265f0cacdbf0', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 360, '2023-03-05 18:34:33', '2023-03-05 18:34:33', null);
insert into tbl_myhistory values('5be35a18-fd1a-4136-9837-50ac6243a88e', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 237, '2023-03-06 21:30:00', '2023-03-06 21:30:00', null);
insert into tbl_myhistory values('94b71146-ec35-4f00-ab5a-20551a17017f', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 245, '2023-03-07 03:30:00', '2023-03-07 03:30:00', null);
insert into tbl_myhistory values('27245397-22ea-4af5-b5c2-8f1dcc4a2947', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 3678, '2023-03-12 01:30:00', '2023-03-12 01:30:00', null);
insert into tbl_myhistory values('c7d2e046-df3b-4cb4-b1c4-e9c1fdf2eb36', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 341, '2023-03-17 13:30:00', '2023-03-17 13:30:00', null);
insert into tbl_myhistory values('7fb01edb-e29e-48bc-a5cf-70d977ddd5de', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 741, '2023-03-17 17:30:00', '2023-03-17 17:30:00', null);
insert into tbl_myhistory values('8d3b0fd6-afe9-4c6a-b6f6-50a23fbc71e4', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 861, '2023-03-17 22:30:00', '2023-03-17 22:30:00', null);
insert into tbl_myhistory values('cfb5a016-8d5f-410c-9497-e7be1a0a19db', '31a1c45d-4026-4533-a63d-b44d58408556', '38d44dba-910a-49cb-88b0-440353164777', 341, '2023-03-19 10:30:00', '2023-03-19 10:30:00', null);
 */
exports.up = (knex) => {
    return knex.schema.dropTableIfExists('tbl_myhistory').createTable('tbl_myhistory', (table)=>{
        table.uuid('id').notNullable().primary().index('tbl_myhistory_id_index')
        table.uuid('user_id').notNullable().index('tbl_myhistory_user_id_index')
        table.uuid('mybook_id').notNullable().index('tbl_myhistory_mybook_id_index')
        table.integer('reading_time').notNullable().defaultTo(0)
        table.timestamp('created_at').defaultTo(knex.fn.now()).index('tbl_myhistory_created_at_index')
        table.timestamp('updated_at').defaultTo(knex.fn.now()).index('tbl_myhistory_updated_at_index')
        table.timestamp('deleted_at')
    })
}

exports.down = (knex)=>{
    return knex.schema.dropTable('tbl_myhistory')
}