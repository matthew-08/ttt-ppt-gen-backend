CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    passhash VARCHAR(255) NOT NULL
);

CREATE TABLE ppt_template (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE field_type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE ppt_template_field (
    template_id SERIAL REFERENCES ppt_template(id) NOT NULL
    field_id SERIAL REFERENCES field_type(id) NOT NULL,
    PRIMARY SERIAL KEY(template_id, field_id)
);

CREATE TABLE user_ppt_template (
    id SERIAL PRIMARY KEY,
    template_id SERIAL REFERENCES ppt_template(id),
    user_id SERIAL REFERENCES users(id)
);

CREATE TABLE user_ppt_template_entry (
    id SERIAL PRIMARY KEY,
    user_ppt_template_id SERIAL REFERENCES user_ppt_template(id),
    template_field_id SERIAL REFERENCES ppt_template_field(id),
    entry_content VARCHAR(255) NOT NULL 
);