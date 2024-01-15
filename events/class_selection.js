const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");

module.exports = {
    class_selection: async function(interaction) {

        let original_message = await common.original_message(interaction)
        let original_class_selection = await common.original_class_selection(interaction)
        console.log(interaction.values)


        // const receivedEmbed = interaction.message.embeds[0];
        // let fields = interaction.message.embeds[0].fields
        //
        // if (!fields.find(field => field.value === username)) {
        //     fields.push({name: 'Checked-in', value: username})
        //     const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields)
        //
        //     const row = new ActionRowBuilder()
        //         .addComponents(checkin_components.class_selection_options);
        //
        //     interaction.message.edit({embeds: [revised_embed]})
        //     interaction.reply({
        //         content: `You checked-in as ${username}.`,
        //         ephemeral: true,
        //         components: [row],
        //     })
        // } else {
        //     const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields.filter(field => field.value !== username))
        //
        //
        //     interaction.message.edit({embeds: [revised_embed]})
        //     interaction.reply({
        //         content: `You checked-out.`,
        //         ephemeral: true,
        //     })
        // }
    }
}