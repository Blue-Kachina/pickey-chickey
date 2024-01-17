const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components.js");
const common = require("../helpers/common.js");

module.exports = {
    class_selection: async function(interaction) {

        let checked_in_users_message = await common.checked_in_users_message(interaction)

        const receivedEmbed = checked_in_users_message.embeds[0]
        let fields = checked_in_users_message.embeds[0].fields

        const username = common.username(interaction)
        let new_field_value = interaction.values.join(', ')
        let field_match = fields.find(field => field.name === username)
        if (field_match) {
            field_match.value = new_field_value
        } else {
            fields.push({name: username, value: new_field_value})
        }

        let person_people = fields.length === 1 ? 'person' : 'people'
        let has_have = fields.length === 1 ? 'has' : 'have'
        const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields).setDescription(`${fields.length} ${person_people} ${has_have} checked-in.`)
        checked_in_users_message.edit({embeds: [revised_embed]})

        interaction.reply({
            content: `Your class selections have been updated.`,
            ephemeral: true,
        })

    }
}