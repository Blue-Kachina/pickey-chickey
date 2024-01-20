const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, ActionRowBuilder, Channel
} = require("discord.js");
const checkin_components = require("../components/checkin_components");

module.exports = {
    username: function(interaction) {
        return interaction.user.globalName ?? interaction.user.username
    },

    channel: function(interaction) {
        return interaction.client.channels.cache.get(interaction.channelId)
    },

    original_message: async function(interaction){
        let messages = await interaction.channel.messages.fetchPinned()
        return original_message = messages?.first()
    },

    original_embed: async function(interaction) {
        const receivedEmbed = await module.exports.original_message().embeds[0]
        return EmbedBuilder.from(receivedEmbed)
    },

    checked_in_users_message: async function(interaction) {
        let messages = await interaction.channel.messages.fetch()
        let found_message = messages.find(message => !!message.embeds.find(embed => embed.title==="Chickins"))

        if (!!found_message) {
            return found_message
        }
    },

    captain_A_username: async function(interaction) {
        let user_id = interaction.user
        let messages = await interaction.channel.messages.fetch()
        let found_message = messages.find(message => message.content === 'Team A Roster')
        let found_embed = found_message?.embeds[0]
        let username = found_embed?.title

        return username ?? null
    },

    captain_B_username: async function(interaction) {
        let user_id = interaction.user
        let messages = await interaction.channel.messages.fetch()
        let found_message = messages.find(message => message.content === 'Team B Roster')
        let found_embed = found_message?.embeds[0]
        let username = found_embed?.title

        return username ?? null
    },

    submitter_is_captain: async function(interaction) {
        let submitter_username = module.exports.username(interaction)
        let captain_a_username = await module.exports.captain_A_username(interaction)
        let captain_b_username = await module.exports.captain_B_username(interaction)
        let captains = [captain_a_username, captain_b_username]
        return captains.includes(submitter_username)
    },

    submitter_roster_message: async function(interaction) {
        let submitter_username = module.exports.username(interaction)
        let messages = await interaction.channel.messages.fetch()
        let found_message = messages.find(message => (message.content === 'Team A Roster' || message.content === 'Team B Roster') && message.embeds.find(embed => embed.title === submitter_username))

        return found_message?.id ? found_message : null
    },

    user_is_draftable: async function(interaction, username) {
        let submitter_username = module.exports.username(interaction)
        let messages = await interaction.channel.messages.fetch()
        let found_message = messages.find(message => (message.content === 'Team A Roster' || message.content === 'Team B Roster') && message.embeds.find(embed => embed.title === submitter_username))

        return found_message?.id ? found_message : null
    },

    list_checked_in_users: async function(interaction) {
        let message_to_check = await module.exports.checked_in_users_message(interaction)
        if (!message_to_check) return;

        return message_to_check.embeds?.length ? message_to_check.embeds[0]?.fields : null
    },

    current_team_A: async function(interaction) {
        let messages = await interaction.channel.messages.fetch()
        let roster_messages = messages.find(message => (message.content === 'Team A Roster'))
        if (!roster_messages) return;

        let mapped_roster = roster_messages.embeds.filter(roster_entry => roster_entry.title !== '-' || roster_entry.description !== '-').map(roster_entry => {
            if(roster_entry.title !== '-' || roster_entry.description !== '-') {
                return {'name': roster_entry.title, 'value': roster_entry.description}
            }
        })

        return mapped_roster
    },

    current_team_B: async function(interaction) {
        let messages = await interaction.channel.messages.fetch()
        let roster_messages = messages.find(message => (message.content === 'Team B Roster'))
        if (!roster_messages) return;

        let mapped_roster = roster_messages.embeds.filter(roster_entry => roster_entry.title !== '-' || roster_entry.description !== '-').map(roster_entry => {
            if(roster_entry.title !== '-' || roster_entry.description !== '-') {
                return {'name': roster_entry.title, 'value': roster_entry.description}
            }
        })

        return mapped_roster
    },

    available_players_list: async function(interaction) {
        let players_list = await module.exports.list_checked_in_users(interaction)
        let current_team_A = await module.exports.current_team_A(interaction)
        let current_team_B = await module.exports.current_team_B(interaction)
        let mapped_team_A = current_team_A.map(team_member => team_member.name)
        let mapped_team_B = current_team_B.map(team_member => team_member.name)
        let all_team_member_names = mapped_team_A.concat(mapped_team_B)
        return players_list.filter(player => !all_team_member_names.includes(player.name))
    },
}
