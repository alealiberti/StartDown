# Cascina Caccia Database

This is a brief description of the database. More information about the overall backend project can be found in the [Backend Docs file](../Docs/backend/README.md).

## Developers

[Aliberti Alessandro](https://github.com/alealiberti) | [Marcolongo Ettore](https://github.com/MrLetss)

## DB Structure

The database has 3 tables and their structure is as follows:

- users
  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `email` (_MAX 50 chars_)
  - `password` (_hashed, MAX 255 chars_)
  - `role` (_MAX 50 chars_)
- informations
  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `phone` (_Nullable, MAX 10 chars_)
  - `email` (_MAX 50 chars_)
  - `date_send` (_date object_)
  - `text` (_MAX 1000 chars_)
  - `archived` (_tinyint_)
- reservations

  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `phone` (_Nullable, MAX 10 chars_)
  - `email` (_MAX 50 chars_)
  - `date_send` (_date object_)
  - `date_start` (_date object_)
  - `date_finish` (_Nullable, date object_)
  - `hour_start` (_Nullable, time object_)
  - `hour_finish` (_Nullable, time object_)
  - `status` (_MAX 25 chars_)
  - `archived` (_tinyint_)
  - `type_group` (_MAX 25 chars_)
  - `visitors` (_int_)
  - `companions` (_Nullable, int_)
  - `additional_info` (_Nullable, MAX 1000 chars_)
  - `mobility_problems` (_tinyint_)

## Data dump

The [data dump](./data-dump.sql) file contains sample data to test the application's CRUD operations.  
The `users` table contains two users: an `OWNER` created by default and an `ADMIN` imported with the dump.

| Username/Email           | Password      | Role  |
| ------------------------ | ------------- | ----- |
| startdownowner@gmail.com | Password123\* | OWNER |
| startdownadm@gmail.com   | Password123\* | ADMIN |
