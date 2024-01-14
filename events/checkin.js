const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder
} = require("discord.js");
const checkin_components = require("../components/checkin_components");

module.exports = {
    chickin: function(interaction) {
        const username = interaction.user.globalName ?? interaction.user.username

        const receivedEmbed = interaction.message.embeds[0];
        let fields = interaction.message.embeds[0].fields

        if (!fields.find(field => field.value === username)) {
            fields.push({name: 'Checked-in', value: username})
            const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields)

            const row = new ActionRowBuilder()
                .addComponents(checkin_components.class_selection_options);

            interaction.message.edit({embeds: [revised_embed]})
            interaction.reply({
                content: `You checked-in as ${username}.`,
                ephemeral: true,
                components: [row],
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