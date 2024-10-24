const { musicValidations } = require('@helpers/BotUtils')
const prettyMs = require('pretty-ms')
const { durationToMillis } = require('@helpers/Utils')
const { ApplicationCommandOptionType } = require('discord.js')
const { MUSIC } = require('@src/config.js')

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: 'seek',
  description: "sets the playing track's position to the specified position",
  category: 'MUSIC',
  validations: musicValidations,

  slashCommand: {
    enabled: MUSIC.ENABLED,
    options: [
      {
        name: 'time',
        description: 'The time you want to seek to.',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async interactionRun(interaction) {
    const time = interaction.options.getString('time')
    const response = seekTo(interaction, time)
    await interaction.followUp(response)
  },
}

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 * @param {number} time
 */
function seekTo({ client, guildId }, time) {
  const player = client.musicManager?.getPlayer(guildId)
  const seekTo = durationToMillis(time)

  if (seekTo > player.queue.current.length) {
    return 'The duration you provide exceeds the duration of the current track'
  }

  player.seek(seekTo)
  return `Seeked to ${prettyMs(seekTo, {
    colonNotation: true,
    secondsDecimalDigits: 0,
  })}`
}
