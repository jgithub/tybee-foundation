begin;
/* cleared, unanswered, '<unanswered>', -7, passively_unanswered, actively_unanswered */
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


CREATE TABLE IF NOT EXISTS entity (
  id serial PRIMARY KEY,
  type entity_type NOT NULL,
  pin VARCHAR (50) NOT NULL
);


commit;