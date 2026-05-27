const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const userController = require('../controllers/userController');

router.get('/profile', authMiddleware, (req, res) => {

  res.json({
    message: 'Route protégée',
    user: req.user
  });

});

router.post('/update', authMiddleware, async (req, res) => {

  await userController.updateUser(
    {
      params: { id: req.body.id },
      body: req.body
    },
    res
  );

});

// DELETE depuis formulaire dashboard
router.post('/delete', authMiddleware, async (req, res) => {

  await userController.deleteUser(
    {
      params: { id: req.body.id }
    },
    res
  );

});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste des utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste récupérée
 */
router.get('/', authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Détail d’un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 */
router.get('/:id', authMiddleware, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/', authMiddleware, userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.put('/:id', authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;