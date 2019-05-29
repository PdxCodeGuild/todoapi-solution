const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const Item = require('../models/Item');

const router = Router();

const createValidators = [
  check("task").exists(),
  check("list").exists(),
];


// Create
router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { task, list } = req.body;

  try {
    const item = new Item({
      task,
      list
    });

    await item.save();

    res.send(item);
  } catch(error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// Retrieve (or read)
// 5cedf40d4da8220ffeb04652
router.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  
  const item = await Item.findOne({ _id });

  if(item) {
    res.send(item);
  } else {
    res.sendStatus(404);
  }
});

router.patch('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    const item = await Item.findOneAndUpdate({ _id }, req.body, {
      new: true
    });

    if(item) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    await Item.findOneAndDelete({ _id });
    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;