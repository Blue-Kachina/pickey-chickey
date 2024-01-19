const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");

module.exports = {
    class_selection: async function(interaction) {

        // Check if user is already in a roster
        let submitter_username = common.username(interaction)
        let roster_message = await common.submitter_roster_message(interaction)

        if (!roster_message?.id) {
            interaction.reply({
                content: `You can only choose your class once you've been added onto a team.`,
                ephemeral: true
            })
            return;
        }

        // Find and update user's embed/entry in the roster lists

        const original_embed = roster_message?.embeds.find((embed, embed_index) => embed.title === submitter_username)
        if (!original_embed || !original_embed.length) {
            interaction.reply({
                content: `An unknown error has occurred.`,
                ephemeral: true
            })
            return;
        }

        const position_requested = interaction.values[0]
        let revised_embeds = roster_message.embeds.map(embed => {
            if (embed.title === submitter_username) {
                return EmbedBuilder.from({description: position_requested, title: embed.title})
            }
            return EmbedBuilder.from(embed)
        })
        roster_message.edit({embeds: revised_embeds})

        // Update the channel informing everyone of the update

        interaction.reply({
            content: `${interaction.user} updated their position to ${position_requested}.`,
            ephemeral: false,
        })

    }
}