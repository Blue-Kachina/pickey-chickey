const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");
const draft_components = require("../components/draft_components");

module.exports = {
    player_selected: async function(interaction) {

        await interaction.deferReply({content:"Working on adding them to the team", ephemeral: true})
        let selected_player = interaction?.values?.length ? interaction.values[0] : null
        if (!selected_player) await interaction.editReply({content: "Something went wrong"})

        let available_players_list = await common.available_players_list(interaction)
        if (!available_players_list.map(player => player.name).includes(selected_player)) {
            console.log(available_players_list)
            await interaction.editReply({content: `${selected_player} was not listed among currently available players`})
            return;
        }

        let roster_message = await common.submitter_roster_message(interaction)
        let first_opening_index = roster_message.embeds.findIndex(embed => embed.title === '-')
        let revised_embeds = roster_message.embeds.map((embed, embed_index) => {
            if (embed_index === first_opening_index) {
                return EmbedBuilder.from({description: embed.description, title: selected_player})
            }
            return EmbedBuilder.from({description: embed.description, title: embed.title})
        })

        // Let event invoker know that we're done
        await interaction.editReply({
            content: "All done",
        })

        // Update the message embed within the roster with the udpated player
        // ToDo: Uncomment this later
        // await roster_message.edit({
        //     embeds: revised_embeds
        // })

        // Let everyone in the channel know that the roster has been updated
        await interaction.channel.send({
            content: `${selected_player} has been added to ${roster_message.content}`
        })

        let channel = common.channel(interaction)
        let channel_members = await channel.members.fetch()
        console.log(channel_members)
        // let selected_player_object = interaction.client.getUser(selected_player)

        // Allow selected user to pick their class.
        const row = new ActionRowBuilder()
            .addComponents(draft_components.class_selection_options_for_user(selected_player_object));

        interaction.channel.send({
            content: `${selected_player_object} please select your class.`,
            components: [row]
        })

    }
}