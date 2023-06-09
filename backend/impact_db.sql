--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    kode_produk character varying(20) NOT NULL,
    nama_produk character varying(100) NOT NULL,
    deskripsi_produk character varying(200) NOT NULL,
    harga_produk numeric(10,2) NOT NULL,
    uom character varying(5) NOT NULL,
    CONSTRAINT products_uom_check CHECK (((uom)::text = ANY ((ARRAY['SHEET'::character varying, 'ROLLS'::character varying, 'PCS'::character varying])::text[])))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (kode_produk, nama_produk, deskripsi_produk, harga_produk, uom) FROM stdin;
chpf8qc8fdki2g77tc80	Plafon Gipsum	Plafon bahan gipsum grade A	60000.00	SHEET
chphdhk8fdki2g77tc8g	Atap Genteng Galvanis	Atap genteng bahan galvanis grade A	100000.00	SHEET
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (kode_produk);


--
-- PostgreSQL database dump complete
--

