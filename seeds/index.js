const sequelize = require('../config/connection');
const userData = require('./userData.json');
const User = require('../models/User');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })

    process.exit(0);
};

seedAll();