const swaggerJsdoc = require('swagger-jsdoc');

const options = {

  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Russell Marina API',
      version: '1.0.0',
      description: `
API de gestion de marina.

Cette API permet :
- la gestion des utilisateurs,
- la gestion des catways,
- la gestion des réservations.

Authentification sécurisée avec JWT.

Tutoriel :

1. Créer un utilisateur avec /api/auth/register
2. Se connecter avec /api/auth/login
3. Copier le token JWT
4. Utiliser le token dans Authorization Bearer
5. Tester les routes protégées

Glossaire :

- JWT : token d’authentification sécurisé
- Catway : emplacement de bateau
- Reservation : réservation d’un catway
- CRUD : Create Read Update Delete

`
    },

    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],

    components: {
      securitySchemes: {

        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }

      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./routes/*.js']

};

const specs = swaggerJsdoc(options);

module.exports = specs;