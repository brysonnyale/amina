const { ApplicationCommandOptionType } = require('discord.js')

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: 'setrpc',
  description: "Change the bot's Rich Presence",
  category: 'OWNER',
  command: {
    enabled: true,
    usage: '<status> <type> <message>',
    minArgsCount: 3,
  },
  slashCommand: {
    enabled: false,
    ephemeral: true,
    options: [
      {
        name: 'status',
        description: "The bot's status",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'Online',
            value: 'online',
          },
          {
            name: 'Idle',
            value: 'idle',
          },
          {
            name: 'Do Not Disturb',
            value: 'dnd',
          },
          {
            name: 'Invisible',
            value: 'invisible',
          },
        ],
      },
      {
        name: 'type',
        description: 'The type of activity',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'COMPETING',
            value: 'COMPETING',
          },
          {
            name: 'LISTENING',
            value: 'LISTENING',
          },
          {
            name: 'PLAYING',
            value: 'PLAYING',
          },
          {
            name: 'WATCHING',
            value: 'WATCHING',
          },
        ],
      },

      {
        name: 'message',
        description: 'The new Rich Presence message',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args, data) {
    // Parse user input
    const [type, status, newMessage] = args

    // Update the bot's presence
    data.client.user.setPresence({
      activities: [
        {
          name: newMessage,
          type: type,
        },
      ],
      status: status,
    })

    // Respond to the user
    message.safeReply('Rich Presence updated successfully!')
  },

  async interactionRun(interaction, data) {
    // Parse user input
    const type = interaction.options.getString('type')
    const status = interaction.options.getString('status')
    const newMessage = interaction.options.getString('message')

    // Update the bot's presence
    data.client.user.setPresence({
      activities: [
        {
          name: newMessage,
          type: type,
        },
      ],
      status: status,
    })

    // Respond to the user
    interaction.followUp('Rich Presence updated successfully!')
  },
}
