const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");
const draft_components = require("../components/draft_components");

module.exports = {
    execute: async function(interaction) {

        let captains = interaction.values
        if (captains?.length !== 2) return interaction.reply({content: 'Bad captains', ephemeral:true})

        let this_channel = common.channel(interaction)
        let captain_a = interaction.client.users.cache.get(captains[0])
        let captain_b = interaction.client.users.cache.get(captains[1])

        interaction.reply({
            content: `Your captain selections have been updated.`,
            ephemeral: true,
        }).then(response => {

            this_channel.send({
                embeds: [draft_components.roster_a_embed(captain_a),draft_components.roster_b_embed(captain_b)]
            })
        })

    }
}