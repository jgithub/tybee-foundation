begin;
/* cleared, unanswered, '<unanswered>', -7, passively_unanswered, actively_unanswered */
CREATE TYPE entity_type AS ENUM ('user', 'group');


CREATE TABLE IF NOT EXISTS entity (
  id serial PRIMARY KEY,
  type entity_type NOT NULL,
  pin VARCHAR (50) NOT NULL
);


commit;