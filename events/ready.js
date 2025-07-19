const { ActivityType } = require('discord.js');
const { getActivity } = require('../utils/configManager');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const activity = getActivity();
    if (!activity.name || !activity.type) {
      console.warn('⚠️ Missing configuration for bot status in config.yml.');
      return;
    }

    client.user.setActivity(activity.name, {
      type: ActivityType[activity.type.toUpperCase()]
    });
  }
};
