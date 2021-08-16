const {Lead} = require('../models/lead');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // let lead = await Lead.findOne({ Lead_name: req.body.lead_name });
    // if (!lead) return res.status(200).send({message:'Lead exists', status: true});

    res.send({message: 'name'})
});

router.post('/', async (req, res) => {

  let lead = await Lead.findOne({ Lead_name: req.body.lead_name });
  if (lead) return res.status(400).send('Lead already exists');

  lead = new Lead({
    Lead_name: req.body.lead_name,
    Lead_company: req.body.lead_company,
    Lead_domain : req.body.lead_domain,
    Lead_conversion_status: req.body.lead_conversion_status,
    Lead_broadcast_status: req.body.lead_broadcast_status,
    Lead_created_by: req.body.lead_created_by
  });

  await lead.save();
  res.send(lead);

});

router.post('/leadByUser', async (req, res) => {
    let lead = await Lead.find({ Lead_created_by: req.body.lead_created_by });
    if (lead) return res.send(lead);

    res.send({message: 'not found'})
})

router.post('/leadByBroadCast', async (req, res) => {
  let lead = await Lead.find({ Lead_broadcast_status: true });
  if (lead) return res.send(lead);

  res.send({message: 'not found'})
})

module.exports = router; 