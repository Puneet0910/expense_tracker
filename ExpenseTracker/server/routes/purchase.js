const express = require('express');

const purchaseController = require('../controllers/purchase');;

const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/purchase/premiummembership', authenticateToken, purchaseController.purchasepremium);
router.post('/purchase/updatetransactionstatus', authenticateToken, purchaseController.updateTransactionStatus)

module.exports = router;