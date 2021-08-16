const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    Lead_name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    Lead_company: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 255,
      unique: true
    },
    Lead_domain: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    Lead_conversion_status: {
        type: Boolean,
        required: true,
    },
    Lead_broadcast_status: {
        type: Boolean,
        required: true,
    },
    Lead_created_by: {
        type: String,
        minlength: 3,
        maxlength: 50
    }
});

const Lead = mongoose.model('Lead', leadSchema);

exports.Lead = Lead; 