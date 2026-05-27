const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const catwayController = require('../controllers/catwayController');

const reservationRoutes = require('./reservationRoutes');

// GET DETAIL depuis dashboard
router.post('/detail', authMiddleware, async (req, res) => {

    res.redirect(`/catway/${req.body.id}`);
  
  });

router.post('/update', authMiddleware, async (req, res) => {

    await catwayController.updateCatway(
      {
        params: { id: req.body.id },
        body: req.body
      },
      res
    );
  
  });
  
  // DELETE depuis formulaire dashboard
  router.post('/delete', authMiddleware, async (req, res) => {
  
    await catwayController.deleteCatway(
      {
        params: { id: req.body.id }
      },
      res
    );
  
  });

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Liste des catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste récupérée
 */
router.get('/', authMiddleware, catwayController.getAllCatways);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Détail d’un catway
 *     tags: [Catways]
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
 *         description: Catway trouvé
 */
router.get('/:id', authMiddleware, catwayController.getCatwayById);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Catway créé
 */
router.post('/', authMiddleware, catwayController.createCatway);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Catway créé
 */
router.put('/:id', authMiddleware, catwayController.updateCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   patch:
 *     summary: Modifier l’état d’un catway
 *     tags: [Catways]
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
 *         description: État modifié
 */
router.patch('/:id', authMiddleware, catwayController.patchCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
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
 *         description: Catway supprimé
 */
router.delete('/:id', authMiddleware, catwayController.deleteCatway);

router.use('/:id/reservations', reservationRoutes);

module.exports = router;