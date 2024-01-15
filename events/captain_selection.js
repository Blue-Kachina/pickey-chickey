const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");

module.exports = {
    captain_selection: async function(interaction) {

        let stringified_values = interaction.values?.join(', ')

        interaction.reply({
            content: `Your captain selections have been updated to ${stringified_values}.`,
            ephemeral: true,
        })

    }
}