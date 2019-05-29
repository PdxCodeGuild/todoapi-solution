const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const List = require('../models/List');

const router = Router();

const createValidators = [
  check("name").exists().isLength({
    min: 1,
    max: 256,
  }),
];

// List
router.get('/', async (req, res) => {
  const lists = await List.find().populate('items');

  res.send(lists);
});


// Create
router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  try {
    const list = new List(req.body);
    await list.save();

    res.send(list);
  } catch(error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// Retrieve (or read)
// 5cedf40d4da8220ffeb04652
router.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  
  const list = await List.findOne({ _id }).populate('items');

  if(list) {
    res.send(list);
  } else {
    res.sendStatus(404);
  }
});

router.patch('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    const list = await List.findOneAndUpdate({ _id }, req.body, {
      new: true
    });
  
    if(list) {
      res.send(list);
    } else {
      res.sendStatus(404);
    }

    res.send(list);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    await List.findOneAndDelete({ _id });
    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;