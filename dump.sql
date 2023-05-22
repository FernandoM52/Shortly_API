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
INSERT INTO public.sessions VALUES (3, '777547c1-865a-4720-b3bd-c4da17bb686d', 3, '2023-05-20 22:07:41.111108');
INSERT INTO public.sessions VALUES (8, '5f248f91-988c-4c6b-bd91-9e409034ff14', 5, '2023-05-21 00:01:41.110611');
INSERT INTO public.sessions VALUES (10, '9946c3f9-df1f-40ed-acda-ea58dec39354', 5, '2023-05-21 00:01:52.562986');
INSERT INTO public.sessions VALUES (12, '773de5e8-4aae-4c62-b63a-024eee1a9d43', 5, '2023-05-21 00:02:11.608172');
INSERT INTO public.sessions VALUES (14, '56559f92-c20d-41c8-8c4f-ced2da8f48f4', 5, '2023-05-21 00:02:39.621395');
INSERT INTO public.sessions VALUES (16, 'd37fcc06-2b2d-49d9-a7a5-698bf0e73075', 5, '2023-05-21 00:05:04.222077');
INSERT INTO public.sessions VALUES (17, '4e50b324-10a1-4bc7-8610-d4e49f8e16eb', 5, '2023-05-21 00:19:30.001599');
INSERT INTO public.sessions VALUES (18, 'a5a0851e-a7d3-4804-a48b-a27ccc840afa', 7, '2023-05-22 11:59:38.028301');


--
-- Data for Name: shortLinks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."shortLinks" VALUES (2, 2, 'V5vQFHwZYzT5eo1iFiu79', 'https://roberta.com', 0, '2023-05-20 03:24:33.851505');
INSERT INTO public."shortLinks" VALUES (3, 2, '8Ye0c-qUc3Dx5Ld2ZtsKz', 'https://roberta.org', 0, '2023-05-20 03:24:37.206831');
INSERT INTO public."shortLinks" VALUES (5, 1, 'KhrAePS2zTFRJoSuFW-jm', 'https://fernando.com', 0, '2023-05-20 03:25:06.392042');
INSERT INTO public."shortLinks" VALUES (1, 2, '0US2ascQ2Rpr1KAXgQIiF', 'https://roberta.com.br', 2, '2023-05-20 03:24:31.228614');
INSERT INTO public."shortLinks" VALUES (4, 1, 'Cet4YkD5pHzAgmCpDu4ku', 'https://fernando.com.br', 2, '2023-05-20 03:24:59.281559');
INSERT INTO public."shortLinks" VALUES (6, 1, 'UbhR3h8XYM6jgN1Vt16PK', 'https://fernando.org', 1, '2023-05-20 03:25:09.610484');
INSERT INTO public."shortLinks" VALUES (7, 3, '6R9F0Z2tvJbdTRner5n-_', 'https://fernanda.com.br', 0, '2023-05-20 22:08:12.241823');
INSERT INTO public."shortLinks" VALUES (8, 3, '2iBqeeSpQDwDkUQ50fYOV', 'https://fernanda.com', 0, '2023-05-20 22:08:17.250555');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Fernando', 'fernando@fernando.com', '$2b$10$76SUtZpZgZHVWD6w/sJKEOUAJLk.QgqwH0Z/kbZoXmtezHh2tLiq2', '2023-05-20 01:22:06.647089');
INSERT INTO public.users VALUES (2, 'Roberta', 'roberta@roberta.com', '$2b$10$QLVvepzfRolmjucWwnEa1e/eeJ0.sMAtd.TDOqqSc18yP11ZaRvtK', '2023-05-20 01:26:39.479988');
INSERT INTO public.users VALUES (3, 'fefe', 'fefe@fefe.com', '$2b$10$Qy3tdx2s7qTJkfRJy/QwC.ixh7gvJ9hbSy8y4s5BWnlpp6pQRa0pW', '2023-05-20 22:04:09.7001');
INSERT INTO public.users VALUES (4, 'marlene', 'marlene@marlene.com', '$2b$10$pHzg9XIx/p7XGkTXGzM8rexNKynAGuIDmgtyx8nMScOJBcp.cdlWS', '2023-05-20 22:04:19.696469');
INSERT INTO public.users VALUES (5, 'Jose', 'Jose@Jose.com', '$2b$10$OPP7UGuz4o.IG7iLCoSWY.bUXu0T4xlw/sN/JhrvDDL5A64e6.F4S', '2023-05-20 23:35:31.96074');
INSERT INTO public.users VALUES (6, 'Benjamin Macedo', 'Sophia51@yahoo.com', '$2b$10$rg0qoBPIkpUMzkSALsHSc.2I/zm7lN52/gmDEtgWX8hp5jPuulmTG', '2023-05-22 11:55:53.405848');
INSERT INTO public.users VALUES (7, 'Vicente Melo', 'Vicente.Melo94@hotmail.com', '$2b$10$bj9cqVK7G3yH9tHmsz9tt.c3GZ6s5JHwKtuHEA5b1yzuyIwtz3RIm', '2023-05-22 11:59:25.594347');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 18, true);


--
-- Name: shortLinks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shortLinks_id_seq"', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


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

