ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: up
up: migration

.PHONY: migration
migration: 
	migrate -database postgresql://postgres:password@localhost:5432/tybee_development?sslmode=disable -path ./ up

.PHONY: down
down:
	migrate -database postgresql://postgres:password@localhost:5432/tybee_development?sslmode=disable -path ./ down

.PHONY: uuidgen
uuidgen:
	uuidgen | tr 'A-Z' 'a-z' | tr -d '\n' | pbcopy

.PHONY: dump
dump:
	cd ${ROOT_DIR} && PGPASSWORD="password" pg_dump -U postgres -h localhost tybee_development > pgdump.sql
# https://stackoverflow.com/questions/2893954/how-to-pass-in-password-to-pg-dump

