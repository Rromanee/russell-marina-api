const express = require('express');

const router = express.Router({ mergeParams: true });

const authMiddleware = require('../middlewares/authMiddleware');

const reservationController = require('../controllers/reservationController');

// GET DETAIL depuis dashboard
router.post('/detail', authMiddleware, async (req, res) => {

    res.redirect(`/reservation/${req.body.id}`);
  
  });

  // CREATE depuis dashboard
router.post('/create', authMiddleware, async (req, res) => {

    await reservationController.createReservation(
      {
        params: {
          id: req.body.catwayNumber
        },
        body: req.body
      },
      res
    );
  
  });
  
  // DELETE depuis formulaire dashboard
  router.post('/delete', authMiddleware, async (req, res) => {
  
    await reservationController.deleteReservation(
      {
        params: { idReservation: req.body.id }
      },
      res
    );
  
  });

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *   get:
 *     summary: Liste des réservations
 *     tags: [Reservations]
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
 *         description: Liste récupérée
 */
router.get('/', authMiddleware, reservationController.getReservations);

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Détail d’une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation trouvée
 */
router.get('/:idReservation', authMiddleware, reservationController.getReservationById);

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.post('/', authMiddleware, reservationController.createReservation);

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 */
router.delete('/:idReservation', authMiddleware, reservationController.deleteReservation);

module.exports = router;