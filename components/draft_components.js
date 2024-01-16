const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, UserSelectMenuBuilder
} = require("discord.js");

module.exports = {

    mnc_logo: new AttachmentBuilder('./assets/logo_mnc.png')
        .setName('logo_mnc.png'),

    roster_a_embed: function (captain){

        let captainname = captain.globalName ?? captain.username

        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Team A Roster")
            .setDescription(`${captainname}'s Team`)
            // .setFields([
            //     {name: 'Checked-in', value: (captain.globalName ?? captain.username)},
            // ])
    },

    roster_b_embed: function (captain){

        let captainname = captain.globalName ?? captain.username

        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Team B Roster")
            .setDescription(`${captainname}'s Team`)
            // .setFields([
            //     {name: 'Checked-in', value: (captain.globalName ?? captain.username)},
            // ])
    },

    captain_selection_options: new UserSelectMenuBuilder()
        .setCustomId('captain_selection')
        .setPlaceholder("Choose Both Captains")
        .setMinValues(2)
        .setMaxValues(2)
}