import express from "express";
import userController from "../controller/user.Controller.js"; // Ensure this path is correct
const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/:id',userController.getUser);
// router.put('/:id',userController.updateUser);
// router.delete('/:id',userController.deleteUser);
// router.get('/',userController.getAllUser);
// router.put("/recoverAccount", userController.recoverAccount);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', userController.createUser);

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
 *           example: 67a1b8a6db9231ba92563444  # MongoDB ObjectId example
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

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Fetches all users from the database.
 *     responses:
 *       200:
 *         description: List of users
 *       404:
 *         description: No users found
 * */
router.get("/", userController.getAllUser);

router.use('/auth', userController.authRoutes);

// router.put("/recoverAccount", userController.recoverAccount);
export default router;
