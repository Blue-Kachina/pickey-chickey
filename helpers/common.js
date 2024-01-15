const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components");

module.exports = {
    username: function(interaction) {
        return interaction.user.globalName ?? interaction.user.username
    },

    channel: function(interaction) {
        // interaction.client.channels.cache.get(interaction.channelId)
    },

    original_message: async function(interaction){
        let messages = await interaction.channel.messages.fetchPinned()
        return original_message = messages?.first()
    },

    original_embed: async function(interaction) {
        const receivedEmbed = await module.exports.original_message().embeds[0]
        return EmbedBuilder.from(receivedEmbed)
    },

    original_class_selection: async function(interaction) {
        let user_id = interaction.user
        let messages = await interaction.channel.messages.fetchPinned()
        let found_message = messages?.find(message => message.author.id === user_id)

        if (!!found_message) {
            return found_message
        }


    },
}
