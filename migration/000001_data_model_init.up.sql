begin;
CREATE TYPE entity_type AS ENUM ('user', 'group');


create or replace function uuid6() returns uuid as $$
declare
begin
	return uuid6(clock_timestamp());
end $$ language plpgsql;

create or replace function uuid6(p_timestamp timestamp with time zone) returns uuid as $$
declare

	v_time double precision := null;

	v_gregorian_t bigint := null;
	v_clock_sequence_and_node bigint := null;

	v_gregorian_t_hex_a varchar := null;
	v_gregorian_t_hex_b varchar := null;
	v_clock_sequence_and_node_hex varchar := null;

	c_epoch double precision := 12219292800; -- RFC-9562 epoch: 1582-10-15
	c_100ns_factor double precision := 10^7; -- RFC-9562 precision: 100 ns

	c_version bigint := x'0000000000006000'::bigint; -- RFC-9562 version: b'0110...'
	c_variant bigint := x'8000000000000000'::bigint; -- RFC-9562 variant: b'10xx...'

begin

	v_time := extract(epoch from p_timestamp);

	v_gregorian_t := trunc((v_time + c_epoch) * c_100ns_factor);
	v_clock_sequence_and_node := trunc(random() * 2^30)::bigint << 32 | trunc(random() * 2^32)::bigint;

	v_gregorian_t_hex_a := lpad(to_hex((v_gregorian_t >> 12)), 12, '0');
	v_gregorian_t_hex_b := lpad(to_hex((v_gregorian_t & 4095) | c_version), 4, '0');
	v_clock_sequence_and_node_hex := lpad(to_hex(v_clock_sequence_and_node | c_variant), 16, '0');

	return (v_gregorian_t_hex_a || v_gregorian_t_hex_b  || v_clock_sequence_and_node_hex)::uuid;

end $$ language plpgsql;


create or replace function uuid7() returns uuid as $$
declare
    v_timestamp bigint := null;
    v_random_bits bigint := null;

    v_timestamp_hex varchar := null;
    v_random_bits_hex_a varchar := null;
    v_random_bits_hex_b varchar := null;

    c_version bigint := x'0000000000007000'::bigint; -- Version 7 UUID (b'0111...')
    c_variant bigint := x'8000000000000000'::bigint; -- Variant: b'10xx...'

begin
    -- Get current timestamp in milliseconds since Unix epoch
    v_timestamp := trunc(extract(epoch from clock_timestamp()) * 1000);

    -- Generate random bits
    v_random_bits := trunc(random() * 2^32)::bigint << 32 | trunc(random() * 2^32)::bigint;

    -- Convert timestamp and random bits to hexadecimal and format the UUID
    v_timestamp_hex := lpad(to_hex(v_timestamp), 12, '0');
    v_random_bits_hex_a := lpad(to_hex(v_random_bits >> 16), 8, '0');
    v_random_bits_hex_b := lpad(to_hex((v_random_bits & 65535) | c_variant), 4, '0');

    return (v_timestamp_hex || v_random_bits_hex_a || v_random_bits_hex_b)::uuid;
end $$ language plpgsql;



CREATE TABLE IF NOT EXISTS entity (
  id serial PRIMARY KEY,
  type entity_type NOT NULL,
  pin VARCHAR (50) NOT NULL,
	comment VARCHAR (2048) NULL
);

CREATE TABLE IF NOT EXISTS qa_question (
	-- TODO: naming uuid, vs qa_question_id, vs qa_question_uuid
  uuid uuid PRIMARY KEY NOT NULL,
  phrase VARCHAR (2048) NOT NULL,
  sequence float NOT NULL,
  audio_file VARCHAR (2048) NOT NULL,
  audio_offset_begin double precision NULL,
  audio_offset_end double precision NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS qa_question_sequence_idx ON qa_question(sequence);


CREATE TABLE IF NOT EXISTS qa_answer (
  uuid uuid PRIMARY KEY NOT NULL,
  entity_id int NOT NULL,
  qa_question_uuid uuid NOT NULL,
	reported_begin_at timestamp NULL,
	reported_end_at timestamp NULL,
	created_at timestamp NOT NULL 
);
CREATE INDEX IF NOT EXISTS qa_answer_question_uuid_idx ON qa_answer(qa_question_uuid);

create function populate_row_uuid() returns trigger as $$
begin
    if new.uuid is NULL then
        new.uuid := uuid6();
    end if;
    return new;
end
$$ language plpgsql;

create trigger qa_question_uuid_trigger before insert on qa_question for each row execute procedure populate_row_uuid();
create trigger qa_answer_uuid_trigger before insert on qa_answer for each row execute procedure populate_row_uuid();

create function populate_row_created_at() returns trigger as $$
begin
    new.created_at := now();
    return new;
end
$$ language plpgsql;

create trigger qa_answer_created_at_trigger before insert on qa_answer for each row execute procedure populate_row_created_at();


commit;