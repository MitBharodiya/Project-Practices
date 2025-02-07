import express from "express";
import userController from "../controller/user.Controller.js"; // Ensure this path is correct
const router = express.Router();

router.post('/', userController.createUser);
// router.get('/:id',userController.getUser);
// router.get('/',userController.getAllUser);
// router.put('/:id',userController.updateUser);
// router.delete('/:id',userController.deleteUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Fetches a user by their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a1e73bc58199b77fa8d187  # MongoDB ObjectId example
 *     responses:
 *       201:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", userController.getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user based on their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a1e73bc58199b77fa8d187
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Removes a user from the database using their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67a1e73bc58199b77fa8d187
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", userController.deleteUser);

export default router;
