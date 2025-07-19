const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getMessages } = require('../utils/configManager');
const { setGuildData } = require('../utils/dbManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setstarboard')
    .setDescription('Set up the highlight channel')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select the channel for highlighted messages')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    setGuildData(interaction.guildId, { starboard: channel.id });

    const messages = getMessages();
    if (!messages.starboard_set_success) {
      return interaction.reply({
        content: '❌ Missing `starboard_set_success` message in config.yml.',
        ephemeral: true
      });
    }

    const reply = messages.starboard_set_success.replace('{channel}', `<#${channel.id}>`);
    await interaction.reply({ content: reply, ephemeral: true });
  }
};
