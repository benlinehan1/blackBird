create database blackbird;

create table doctors (
  id text,
  full_name text,
  type text,
  credentials int
);

create table relationships (
  id serial primary key,
  patient_id text,
  doctor_id text
);
create table patients (
  id text,
  full_name text
);
create table comment (
  id key,
  patient_id int,
  consultation_id int,
  content text
);
create table consultation (
  id key,
  data timestamp,
  relationship_id int
);
create table section (
  id key,
  consultation_id text,
  title text,
  content text
);