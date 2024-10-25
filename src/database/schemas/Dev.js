const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    PRESENCE: {
      ENABLED: {
        type: Boolean,
        default: true,
      },
      STATUS: {
        type: String,
        enum: ['online', 'idle', 'dnd', 'invisible'],
        default: 'idle',
      },
      TYPE: {
        type: String,
        enum: [
          'COMPETING',
          'LISTENING',
          'PLAYING',
          'WATCHING',
          'STREAMING',
          'CUSTOM',
        ],
        default: 'CUSTOM',
      },
      MESSAGE: {
        type: String,
        default: "We'll show them. We'll show them all...",
      },
      URL: {
        type: String,
        default: 'https://twitch.tv/iamvikshan',
      },
    },
    DEV_COMMANDS: {
      ENABLED: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
)

const Model = mongoose.model('dev-config', Schema)

module.exports = {
  Model,

  async getPresenceConfig() {
    const document = await Model.findOne()
    if (!document) return await Model.create({})
    return document
  },

  async updatePresenceConfig(update) {
    const document = await Model.findOne()
    if (!document) return await Model.create(update)

    for (const [key, value] of Object.entries(update.PRESENCE)) {
      document.PRESENCE[key] = value
    }

    return await document.save()
  },

  async getDevCommandsConfig() {
    const document = await Model.findOne()
    if (!document) return (await Model.create({})).DEV_COMMANDS
    return document.DEV_COMMANDS
  },

  async setDevCommands(enabled) {
    const document = await Model.findOne()
    if (!document)
      return (await Model.create({ DEV_COMMANDS: { ENABLED: enabled } }))
        .DEV_COMMANDS

    document.DEV_COMMANDS.ENABLED = enabled
    await document.save()
    return document.DEV_COMMANDS
  },
}
