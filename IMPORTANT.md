# ⚙️ Instructions importantes pour initialiser la base de données `musee`

Ce guide explique comment **créer un utilisateur dédié**, lui donner les droits nécessaires, puis **importer le script SQL** de la base de données `musee`.

---

## 🧩 1. Connexion à PostgreSQL

Ouvre un terminal et connecte-toi à PostgreSQL avec ton utilisateur principal (souvent `postgres`) :

```bash
psql -U postgres
```

Si ton PostgreSQL demande un mot de passe, ajoute `-W` :
```bash
psql -U postgres -W
```

---

## 👤 2. Création de l’utilisateur `musee_user`

Dans la console PostgreSQL, exécute :

```sql
CREATE USER musee_user WITH PASSWORD 'musee2025';
```

> 💡 Le mot de passe `musee2025` est un exemple. Tu peux le modifier, mais assure-toi de le mettre à jour dans ton fichier `.env` si le backend l’utilise.

---

## 🏛️ 3. Création de la base de données `musee`

Toujours dans PostgreSQL :

```sql
CREATE DATABASE musee OWNER musee_user;
```

Cela crée la base `musee` et en fait automatiquement le propriétaire de `musee_user`.

---

## 🔑 4. Attribution des privilèges (si la base existait déjà)

Si la base `musee` existait avant la création de l’utilisateur, exécute :

```sql
GRANT ALL PRIVILEGES ON DATABASE musee TO musee_user;
```

Puis connecte-toi à la base :

```sql
\c musee
```

Et donne-lui les droits complets sur les objets :

```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO musee_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO musee_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO musee_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO musee_user;
```

---

## 📥 5. Importer le script `musee.sql`

Assure-toi que le fichier `musee.sql` se trouve à la racine du projet (ou ajuste le chemin si besoin).

Quitte PostgreSQL avec :
```sql
\q
```

Puis, dans ton terminal :

```bash
psql -U musee_user -d musee -f musee.sql
```

> 💡 Cette commande va exécuter toutes les instructions contenues dans `musee.sql` (création des tables, insertion des données, etc.).

---

## ✅ 6. Vérification

Reviens dans PostgreSQL :

```bash
psql -U musee_user -d musee
```

Liste les tables :
```sql
\dt
```

Tu devrais voir toutes les tables importées depuis `musee.sql`.

---

## 📁 7. Résumé

| Étape | Action | Commande principale |
|-------|--------|----------------------|
| 1 | Se connecter à PostgreSQL | `psql -U postgres` |
| 2 | Créer l’utilisateur | `CREATE USER musee_user WITH PASSWORD 'musee2025';` |
| 3 | Créer la base | `CREATE DATABASE musee OWNER musee_user;` |
| 4 | Donner les privilèges | `GRANT ALL PRIVILEGES ...` |
| 5 | Importer le script | `psql -U musee_user -d musee -f musee.sql` |
| 6 | Vérifier les tables | `\dt` |

---

## 💡 Conseils

- Ne partage **jamais ton utilisateur `postgres`** avec d’autres.  
- Utilise toujours un utilisateur de projet dédié (`musee_user` ici).  
- Si tu rencontres une erreur “permission denied”, vérifie que `musee_user` est bien propriétaire de la base.  
- En cas d’erreur d’importation, ouvre le fichier `musee.sql` dans un éditeur et exécute-le ligne par ligne dans **pgAdmin → Query Tool**.
