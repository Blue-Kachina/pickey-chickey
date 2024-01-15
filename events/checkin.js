const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, ComponentType
} = require("discord.js");
const checkin_components = require("../components/checkin_components");
const common = require("../helpers/common.js");

module.exports = {
    chickin: function(interaction) {
        const username = interaction.user.globalName ?? interaction.user.username

        const receivedEmbed = interaction.message.embeds[0];
        let fields = interaction.message.embeds[0].fields

        if (!fields.find(field => field.value === username)) {

            // Update original posting with new checkin info
            fields.push({name: 'Checked-in', value: username})
            const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields)
            interaction.message.edit({embeds: [revised_embed]})

            // Let the user know it's been updated
            interaction.reply({
                content: `You checked-in as ${username}.`,
                ephemeral: true,
            })

            // Create a pinned placeholder for this user's class selection
            let threadchannel = common.channel(interaction)
            threadchannel.send({
                embeds: [checkin_components.class_selection_embed(interaction.user)],
            })
                .then(response => {
                    // An example of editing an embed that was previously posted
                    // embed.setDescription("Description of that same embed can now be updated like this")
                    // response.edit({embeds:[embed]})
                    // response.pin()

                    // // Let the user select which classes they would like to play as
                    // const row = new ActionRowBuilder()
                    //     .addComponents(checkin_components.class_selection_options);
                    // threadchannel.send({
                    //     content: `Please select the classes you're willing to play as (in priority sequence).`,
                    //     components: [row],
                    // })
                })






        } else {
            const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields.filter(field => field.value !== username))


            interaction.message.edit({embeds: [revised_embed]})
            interaction.reply({
                content: `You checked-out.`,
                ephemeral: true,
            })
        }
    }
}