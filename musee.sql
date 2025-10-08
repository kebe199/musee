--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2025-10-08 01:51:40

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

DROP DATABASE IF EXISTS musee;
--
-- TOC entry 4841 (class 1262 OID 35162)
-- Name: musee; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE musee WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Senegal.1252';


ALTER DATABASE musee OWNER TO postgres;

\connect musee

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
-- TOC entry 216 (class 1259 OID 35164)
-- Name: works; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.works (
    id integer NOT NULL,
    title jsonb NOT NULL,
    description jsonb NOT NULL,
    image text,
    audio text,
    video text,
    history text,
    culturalcontext jsonb,
    significance jsonb
);


ALTER TABLE public.works OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 35163)
-- Name: works_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.works_id_seq OWNER TO postgres;

--
-- TOC entry 4843 (class 0 OID 0)
-- Dependencies: 215
-- Name: works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.works_id_seq OWNED BY public.works.id;


--
-- TOC entry 4688 (class 2604 OID 35167)
-- Name: works id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works ALTER COLUMN id SET DEFAULT nextval('public.works_id_seq'::regclass);


--
-- TOC entry 4835 (class 0 OID 35164)
-- Dependencies: 216
-- Data for Name: works; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.works (id, title, description, image, audio, video, history, culturalcontext, significance) VALUES (1, '{"en": "Dan Mask", "fr": "Masque Dan", "wo": "Dan Guej"}', '{"en": "Ceremonial mask...", "fr": "Masque ceremonial...", "wo": "Masquu bu..."}', '/media/masque1.jpg', '{"fr": "/media/Masque dan.mp3", "en": "/media/Dan mask.mp3", "wo": "/media/.mp3"}', '', 'Origine : C“te d''Ivoire...', '{"en": "Dan masks...", "fr": "Les masques Dan...", "wo": "Masquu Dan..."}', '{"en": "Symbol of protection...", "fr": "Symbole de protection...", "wo": "Simbolu ngor..."}');
INSERT INTO public.works (id, title, description, image, audio, video, history, culturalcontext, significance) VALUES (2, '{"en": "Fertility Statuette", "fr": "Statuette de Fertilité", "wo": "Jàmm ak Baraka"}', '{"en": "Traditional female sculpture from Mali, symbolizing fertility and prosperity. Often offered during marriage ceremonies, this statuette embodies the hope of offspring and ancestral blessing for the new union.", "fr": "Sculpture féminine traditionnelle du Mali, symbole de fertilité et de prospérité. Souvent offerte lors des mariages, cette statuette incarne l''espoir de descendance et la bénédiction des ancêtres pour la nouvelle union.", "wo": "Sutura bu jigéen ci Mali, di simbolu ndox muus ak barkeel. Ñu koy def ci jamono ngir njaboot, sutura bii mooy jëmmal xel mu am ci ndox muus ak barkeelu ñi faatu ci njabootu bees."}', '/media/statue1.jpg', '{"fr": "/media/Statuette de fertilité.mp3", "en": "/media/Fertility Statuette.mp3", "wo": "/media/.mp3"}', '', 'Origine : Mali, région de Bandiagara. Fabriquée à la main par les sculpteurs dogons, cette statuette incarne la bénédiction et la continuité de la vie. Elle est transmise de génération en génération.', '{"en": "In Dogon culture, fertility is considered a gift from ancestors. These statuettes are often placed in bridal chambers to ensure the couple''s prosperity.", "fr": "Dans la culture dogon, la fertilité est considérée comme un don des ancêtres. Ces statuettes sont souvent placées dans les chambres nuptiales pour assurer la prospérité du couple.", "wo": "Ci cosaanu Dogon, ndox muus mooy ndimbalu ñi faatu. Sutura yii ñu koy dëkk ci kër ngir barkeelu njaboot bi."}', '{"en": "Represents the continuity of life and transmission of family values. Symbol of hope and prosperity for future generations.", "fr": "Représente la continuité de la vie et la transmission des valeurs familiales. Symbole d''espoir et de prospérité pour les générations futures.", "wo": "Jëmmal cosaanu dund ak jëfandikoo jëmmiinu njaboot. Simbolu xel ak barkeel ci ñi dina ñëw."}');
INSERT INTO public.works (id, title, description, image, audio, video, history, culturalcontext, significance) VALUES (3, '{"en": "Akan Royal Cloth", "fr": "Tissu Royal Akan", "wo": "Weer gi Kan"}', '{"en": "Handwoven fabric from the Akan people (Ghana). Each pattern carries a proverb or social message. This royal cloth is worn only by chiefs and royal family members during important ceremonies.", "fr": "Tissu tissé à la main par les artisans Akan (Ghana). Chaque motif représente un proverbe ou un message social. Ce tissu royal est porté uniquement par les chefs et les membres de la famille royale lors des cérémonies importantes.", "wo": "Weer bu ñu dajale ak loxo ci àddina Akan (Gana). Benn motif mooy xamal kàddu gu am solo ci jamono bi. Weer gi mooy def rekk buur yi ak ñi ci njabootu buur bi ci jamono yu am solo."}', '/media/tissu1.jpg', '{"fr": "/media/tissu royal akan.mp3", "en": "/media/Akan royal cloth.mp3", "wo": "/media/.mp3"}', '', 'Origine : Ghana, région Ashanti. Le tissu est porté lors des cérémonies royales pour exprimer l''identité et la dignité du peuple Akan. Chaque motif raconte une histoire ou transmet une leçon de vie.', '{"en": "Weaving is a sacred art among the Akan. Each pattern has deep meaning and tells the community''s story. Colors and patterns vary according to social status.", "fr": "Le tissage est un art sacré chez les Akan. Chaque motif a une signification profonde et raconte l''histoire de la communauté. Les couleurs et les motifs varient selon le statut social.", "wo": "Dajal mooy jëfandikoo yu rafet ci Akan. Benn motif am na solo bu xóot ak mooy xamal taariixu jamono bi. Melo ak motif yi di wuute ci boppu nit."}', '{"en": "Symbol of power, wisdom and cultural identity. The royal cloth unites the community around shared values and ancestral traditions.", "fr": "Symbole de pouvoir, de sagesse et d''identité culturelle. Le tissu royal unit la communauté autour de valeurs partagées et de traditions ancestrales.", "wo": "Simbolu doole, xam-xam ak boppu aada. Weer gi di jëkkal jamono bi ci jëmmiinu cosaanu ak aada."}');
INSERT INTO public.works (id, title, description, image, audio, video, history, culturalcontext, significance) VALUES (4, '{"en": "Yoruba Sculpture", "fr": "Sculpture Yoruba", "wo": "Sutura Yoruba"}', '{"en": "Wooden sculpture representing a Yoruba deity (Nigeria). This sacred artwork is used in religious rituals to honor the orishas and maintain spiritual connection with the divine.", "fr": "Sculpture en bois représentant une divinité Yoruba (Nigeria). Cette œuvre d''art sacrée est utilisée dans les rituels religieux pour honorer les orishas et maintenir la connexion spirituelle avec le divin.", "wo": "Sutura ci kër bu jëmmal yoonu Yoruba (Nigeria). Jëmmiinu rafet bii di fane woon ci njàngat yu rafet ngir yiwu orisha yi ak ngir jëkkal ci yoonu rafet."}', '/media/yoruba1.jpg', '{"fr": "/media/Sculpture yoruba.mp3", "en": "/media/yoruba sculpture.mp3", "wo": "/media/.mp3"}', '', 'Origine : Nigeria, région d''Ife. Créée par les maîtres sculpteurs Yoruba, cette sculpture représente l''une des divinités les plus importantes du panthéon Yoruba. Elle est considérée comme un pont entre le monde terrestre et spirituel.', '{"en": "In Yoruba religion, each deity has specific attributes and particular powers. These sculptures serve as receptacles for divine energy and facilitate communication with spirits.", "fr": "Dans la religion Yoruba, chaque divinité a des attributs spécifiques et des pouvoirs particuliers. Ces sculptures servent de réceptacles pour l''énergie divine et facilitent la communication avec les esprits.", "wo": "Ci diine Yoruba, benn yoon am na jëmmiinu ak doole. Sutura yii di fane woon ngir jëkkal ci doole yu rafet ak ngir wax ak ruwaay yi."}', '{"en": "Represents spiritual connection and veneration of deities. Symbol of divine protection and spiritual guidance for the community.", "fr": "Représente la connexion spirituelle et la vénération des divinités. Symbole de protection divine et de guidance spirituelle pour la communauté.", "wo": "Jëmmal jëkkal ci yoonu rafet ak yiwu yoon yi. Simbolu ngoru rafet ak jëfandikoo ci jamono bi."}');
INSERT INTO public.works (id, title, description, image, audio, video, history, culturalcontext, significance) VALUES (5, '{"en": "Tuareg Jewelry", "fr": "Bijoux Touareg", "wo": "Yëngu Tuareg"}', '{"en": "Traditional silver jewelry from the Tuareg people (Sahara). These refined pieces are worn by women and men as symbols of social status and spiritual protection. Each pattern has a particular meaning.", "fr": "Parure traditionnelle en argent des Touaregs (Sahara). Ces bijoux raffinés sont portés par les femmes et les hommes comme symboles de statut social et de protection spirituelle. Chaque motif a une signification particulière.", "wo": "Yëngu cosaanu ci loxo ci Tuareg (Sahara). Yëngu yii di fane woon ci jigéen ak góor ngir jëmmal boppu jamono ak ngoru rafet. Benn motif am na solo."}', '/media/touareg1.jpg', '{"fr": "/media/bijoux touareg.mp3", "en": "/media/Touareg jewerly.mp3", "wo": "/media/.mp3"}', '', 'Origine : Sahara, région du Niger et du Mali. Les bijoux Touareg sont fabriqués par les forgerons nomades selon des techniques ancestrales. L''argent est considéré comme un métal pur qui repousse les mauvais esprits.', '{"en": "Among the Tuareg, silver is more precious than gold because it is associated with the moon and purity. Jewelry is passed from mother to daughter and tells the family story.", "fr": "Chez les Touaregs, l''argent est plus précieux que l''or car il est associé à la lune et à la pureté. Les bijoux sont transmis de mère en fille et racontent l''histoire familiale.", "wo": "Ci Tuareg, loxo mooy gën a am solo ci wuuru ndax mooy jëkkal ci weer ak ndaw. Yëngu yi di jëfandikoo ci ndey ak doom ji ak ñu xamal taariixu njaboot bi."}', '{"en": "Symbol of protection, cultural identity and generational transmission. Tuareg jewelry unites generations and preserves nomadic traditions.", "fr": "Symbole de protection, d''identité culturelle et de transmission générationnelle. Les bijoux Touareg unissent les générations et préservent les traditions nomades.", "wo": "Simbolu ngor, boppu aada ak jëfandikoo ci jamono. Yëngu Tuareg di jëkkal jamono yi ak ngir cosaanu aada."}');


--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 215
-- Name: works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.works_id_seq', 5, true);


--
-- TOC entry 4690 (class 2606 OID 35171)
-- Name: works works_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works
    ADD CONSTRAINT works_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 0 OID 0)
-- Dependencies: 4841
-- Name: DATABASE musee; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE musee TO musee_user;


-- Completed on 2025-10-08 01:51:40

--
-- PostgreSQL database dump complete
--

