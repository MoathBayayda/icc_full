## to open db from cmd : psql -d icc -U icc@admin

## db tables :

## public.admin

```-- Table: public.admin

-- DROP TABLE IF EXISTS public.admin;

CREATE TABLE IF NOT EXISTS public.admin
(
    admin_id integer NOT NULL DEFAULT 0,
    admin_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (admin_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.admin
    OWNER to "icc@admin";
```

## Table: public.course

```
-- Table: public.course

-- DROP TABLE IF EXISTS public.course;

CREATE TABLE IF NOT EXISTS public.course
(
    course_id integer NOT NULL DEFAULT nextval('course_course_id_seq'::regclass),
    student_ids integer[],
    course_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    num_students integer NOT NULL,
    pass_mark integer NOT NULL,
    days character varying(255) COLLATE pg_catalog."default" NOT NULL,
    max_students integer NOT NULL,
    availability boolean NOT NULL,
    price integer NOT NULL,
    duration_hours integer NOT NULL,
    registration_date date NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    starting_time integer NOT NULL,
    ending_time integer NOT NULL,
    instructor character varying(255) COLLATE pg_catalog."default" NOT NULL,
    hall_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    certificates character varying(255)[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT course_pkey PRIMARY KEY (course_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.course
    OWNER to "icc@admin";

```

## Table: public.news

```
-- Table: public.news

-- DROP TABLE IF EXISTS public.news;

CREATE TABLE IF NOT EXISTS public.news
(
    news_id integer NOT NULL DEFAULT nextval('news_news_id_seq'::regclass),
    title character varying(5000) COLLATE pg_catalog."default" NOT NULL,
    content character varying(5000) COLLATE pg_catalog."default" NOT NULL,
    description character varying(5000) COLLATE pg_catalog."default" NOT NULL,
    news_date date NOT NULL,
    src text[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT news_pkey PRIMARY KEY (news_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.news
    OWNER to "icc@admin";
```

## public.student

```
-- Table: public.student

-- DROP TABLE IF EXISTS public.student;

CREATE TABLE IF NOT EXISTS public.student
(
    student_id integer NOT NULL DEFAULT nextval('student_student_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    street character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    registration_date date NOT NULL,
    gender character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nationality character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birth_date date NOT NULL,
    reg_course_ids integer[] NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    national_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    certificates character varying(255)[] COLLATE pg_catalog."default",
    CONSTRAINT student_pkey PRIMARY KEY (student_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.student
    OWNER to "icc@admin";

```
