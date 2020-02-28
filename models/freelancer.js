const mongo = require('mongoose'),
    Schema = mongo.Schema,
    freelancerSchema = new Schema({
        username: String,
        email: String,
        mobile: String,
        skillsets: [String],
        hobbies: [String]
    });

module.exports = mongo.model('Freelancers', freelancerSchema);
