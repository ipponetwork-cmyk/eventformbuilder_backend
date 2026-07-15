const express = require('express');
const router = express.Router();
const FormResponse = require('../models/response.model');

// --- RESPONSE ROUTES ---
router.post('/api/responses', async (req, res) => {
  try {
    const response = new FormResponse(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/api/forms/:formId/responses', async (req, res) => {
  try {
    const responses = await FormResponse.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;

