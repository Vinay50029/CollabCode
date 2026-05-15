const express = require('express');
const fileRoutes = require('./fileRoutes');
const roomRoutes = require('./roomRoutes');
const executeRoute = require('./executeRoute');

const router = express.Router();

router.use('/files', fileRoutes);
router.use('/rooms', roomRoutes);
router.use('/execute', executeRoute);

module.exports = router;
