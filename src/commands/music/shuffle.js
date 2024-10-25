const { musicValidations } = require('@helpers/BotUtils')
const { MUSIC } = require('@src/config.js')

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: 'shuffle',
  description: 'shuffle the queue',
  category: 'MUSIC',
  validations: musicValidations,

  slashCommand: {
    enabled: MUSIC.ENABLED,
  },

  async interactionRun(interaction) {
    const response = shuffle(interaction)
    await interaction.followUp(response)
  },
}

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
function shuffle({ client, guildId }) {
  const player = client.musicManager.getPlayer(guildId)
  player.queue.shuffle()
  return '🎶 Queue has been shuffled'
}
