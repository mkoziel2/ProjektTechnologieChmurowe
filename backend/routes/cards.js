const express = require('express');
const router = express.Router();

const Card = require('../models/Card');

router.get('/', async (req, res) => {
  Card.find(function (err, response) {
  if (err) {
    return err
  } else { 
    return res.send({
      allCards: response
    });
  }
})
});

router.post('/', async (req, res) => {
  const card = new Card({
    ...req.body
  })

  const insertedCard = await card.save()
  
  return res.send(insertedCard);
});

router.put('/:id', async (req, res) => {
  Card.findByIdAndUpdate(req.params.id,{...req.body},function (err, response) {
    if (err) {
      return err
    } else { 
      return res.send({
        editedCard: response
      });
    }
  })
});

router.delete('/:id', async (req, res) => {
  Card.findByIdAndDelete(req.params.id, function (err, response) {
    if (err) {
      return err
    } else { 
      return res.send({
        deletedCard: response
      });
    }
  })
});

module.exports = router;
