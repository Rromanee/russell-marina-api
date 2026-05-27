const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un compte
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Compte créé
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post('/login', authController.login);

module.exports = router;