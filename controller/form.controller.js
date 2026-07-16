const express = require('express');
const router = express.Router();
const Form = require('../models/form.model');

function sanitizeCreateFormPayload(payload = {}) {
  const cleaned = { ...payload };

  // Avoid duplicate-key failures when frontend sends an existing Mongo _id.
  delete cleaned._id;
  delete cleaned.__v;

  if (Array.isArray(cleaned.fields)) {
    cleaned.fields = cleaned.fields.map((field) => {
      const nextField = { ...field };
      delete nextField._id;
      delete nextField.__v;
      return nextField;
    });
  }

  return cleaned;
}

// 4. API ROUTES

// --- FORM ROUTES ---
router.post("/createforms", async (req, res) => {
  try {
    const payload = sanitizeCreateFormPayload(req.body);
    const form = new Form(payload);
    await form.save();
    res.status(201).send(form);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).send({ error: 'Duplicate form id. Remove _id for create API.' });
    }

    return res.status(500).send({ error: err.message });
  }
});

router.get("/viewforms/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).send(form);
  } catch (err) { res.status(500).send({ error: err.message }); }
});

router.put("/updateforms/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(form);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;