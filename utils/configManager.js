const fs = require('fs');
const YAML = require('yaml');

const configPath = './config.yml';

function readConfig() {
  try {
    const file = fs.readFileSync(configPath, 'utf8');
    return YAML.parse(file) || {};
  } catch (error) {
    console.error('Error reading config.yml file:', error);
    return {};
  }
}

function writeConfig(config) {
  try {
    const yamlString = YAML.stringify(config);
    fs.writeFileSync(configPath, yamlString, 'utf8');
  } catch (error) {
    console.error('Error writing to config.yml:', error);
  }
}

function getMessages() {
  const config = readConfig();
  return config.messages || {};
}

function getGuildConfig(guildId) {
  const config = readConfig();
  if (!config.guilds) config.guilds = {};
  if (!config.guilds[guildId]) config.guilds[guildId] = {};
  return config.guilds[guildId];
}

function setGuildConfig(guildId, newData) {
  const config = readConfig();
  if (!config.guilds) config.guilds = {};
  config.guilds[guildId] = {
    ...config.guilds[guildId],
    ...newData
  };
  writeConfig(config);
}

function getAppearance() {
  const config = readConfig();
  return config.appearance || {};
}

function getActivity() {
  const config = readConfig();
  return config.activity || {};
}

module.exports = {
  readConfig,
  writeConfig,
  getMessages,
  getGuildConfig,
  setGuildConfig,
  getAppearance,
  getActivity
};
