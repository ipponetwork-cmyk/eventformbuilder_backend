const express = require('express');
const router = express.Router();
const Form = require('../models/form.model');

// 4. API ROUTES

// --- FORM ROUTES ---
router.post('/api/forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/api/forms/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/api/forms/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(form);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;