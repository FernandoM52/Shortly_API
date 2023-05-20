--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortLinks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shortLinks" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shortLinks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shortLinks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortLinks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shortLinks_id_seq" OWNED BY public."shortLinks".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortLinks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortLinks" ALTER COLUMN id SET DEFAULT nextval('public."shortLinks_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '16913d50-7e5d-4fe6-8895-86250a234f93', 1, '2023-05-20 01:57:33.525147');
INSERT INTO public.sessions VALUES (2, '33bd763b-7034-4568-8fb9-24d7078b036f', 2, '2023-05-20 02:56:03.421859');


--
-- Data for Name: shortLinks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."shortLinks" VALUES (2, 2, 'V5vQFHwZYzT5eo1iFiu79', 'https://roberta.com', 0, '2023-05-20 03:24:33.851505');
INSERT INTO public."shortLinks" VALUES (3, 2, '8Ye0c-qUc3Dx5Ld2ZtsKz', 'https://roberta.org', 0, '2023-05-20 03:24:37.206831');
INSERT INTO public."shortLinks" VALUES (5, 1, 'KhrAePS2zTFRJoSuFW-jm', 'https://fernando.com', 0, '2023-05-20 03:25:06.392042');
INSERT INTO public."shortLinks" VALUES (6, 1, 'UbhR3h8XYM6jgN1Vt16PK', 'https://fernando.org', 0, '2023-05-20 03:25:09.610484');
INSERT INTO public."shortLinks" VALUES (1, 2, '0US2ascQ2Rpr1KAXgQIiF', 'https://roberta.com.br', 2, '2023-05-20 03:24:31.228614');
INSERT INTO public."shortLinks" VALUES (4, 1, 'Cet4YkD5pHzAgmCpDu4ku', 'https://fernando.com.br', 1, '2023-05-20 03:24:59.281559');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Fernando', 'fernando@fernando.com', '$2b$10$76SUtZpZgZHVWD6w/sJKEOUAJLk.QgqwH0Z/kbZoXmtezHh2tLiq2', '2023-05-20 01:22:06.647089');
INSERT INTO public.users VALUES (2, 'Roberta', 'roberta@roberta.com', '$2b$10$QLVvepzfRolmjucWwnEa1e/eeJ0.sMAtd.TDOqqSc18yP11ZaRvtK', '2023-05-20 01:26:39.479988');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: shortLinks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shortLinks_id_seq"', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: shortLinks shortLinks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortLinks"
    ADD CONSTRAINT "shortLinks_pkey" PRIMARY KEY (id);


--
-- Name: shortLinks shortLinks_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortLinks"
    ADD CONSTRAINT "shortLinks_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: shortLinks shortLinks_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortLinks"
    ADD CONSTRAINT "shortLinks_url_key" UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortLinks shortLinks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortLinks"
    ADD CONSTRAINT "shortLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

