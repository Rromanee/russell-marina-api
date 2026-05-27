# Russell Marina API

## API REST de gestion de marina développée avec Node.js, Express et MongoDB.

### Fonctionnalités : 
- Authentification JWT
- Gestion des utilisateurs
- Gestion des catways
- Gestion des réservations
- Tests automatisés avec Mocha & Chai
- Déploiement sur Render
- Base de données MongoDB Atlas
- Technologies utilisées
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT
- Mocha
- Chai
- Render

## Cloner le projet :

```bash
git clone https://github.com/Rromanee/russell-marina-api
```

### Entrer dans le dossier :

```bash
cd russell-marina-api
```

### Installer les dépendances :

```bash
npm install
```

## Variables d’environnement

### Créer un fichier .env à la racine :

MONGO_URI=mongodb://127.0.0.1:27017/russell-marina-api

MONGO_URI_TEST=mongodb://127.0.0.1:27017/russell-marina-test

JWT_SECRET=xxxxxxxxx

PORT=3000

## Lancer le projet

### Démarrer le serveur :

```bash
npm start
```

### Le serveur démarre sur :

http://localhost:3000

## Déploiement

Application déployée avec [Render](https://russell-marina-api-3o86.onrender.com/)

Base de données hébergée sur [MongoDB Atlas](https://www.mongodb.com/atlas/database)

## Endpoints principaux :

Auth
| Méthode | Route                |
| ------- | -------------------- |
| POST    | `/api/auth/login`    |
| POST    | `/api/auth/register` |

Users
| Méthode | Route            |
| ------- | ---------------- |
| GET     | `/api/users`     |
| POST    | `/api/users`     |
| PUT     | `/api/users/:id` |
| DELETE  | `/api/users/:id` |

Catways
| Méthode | Route              |
| ------- | ------------------ |
| GET     | `/api/catways`     |
| POST    | `/api/catways`     |
| GET     | `/api/catways/:id` |
| PUT     | `/api/catways/:id` |
| DELETE  | `/api/catways/:id` |

Reservations
| Méthode | Route                                          |
| ------- | ---------------------------------------------- |
| GET     | `/api/catways/:id/reservations`                |
| POST    | `/api/catways/:id/reservations`                |
| GET     | `/api/catways/:id/reservations/:reservationId` |
| DELETE  | `/api/catways/:id/reservations/:reservationId` |
