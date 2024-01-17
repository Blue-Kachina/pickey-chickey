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
                content: "Team A Roster",
                embeds: draft_components.empty_team_player_slot_embeds(captain_a)
            }).then(response => {
                this_channel.send({
                    content: "Team B Roster",
                    embeds: draft_components.empty_team_player_slot_embeds(captain_b)
                }).then(response => {
                    const row = new ActionRowBuilder()
                        .addComponents(draft_components.class_selection_options_for_user(captain_a));

                    this_channel.send({
                        content: `${captain_a} please select your class.`,
                        components: [row]
                    }).then(response => {
                        const row = new ActionRowBuilder()
                            .addComponents(draft_components.class_selection_options_for_user(captain_b));

                        this_channel.send({
                            content: `${captain_b} please select your class.`,
                            components: [row]
                        })
                    })
                })
            })
        })

    }
}