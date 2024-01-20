const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder, UserSelectMenuBuilder
} = require("discord.js");

const common = require("../helpers/common");

module.exports = {

    mnc_logo: new AttachmentBuilder('./assets/logo_mnc.png')
        .setName('logo_mnc.png'),

    empty_team_player_slot_embeds: function (captain_user) {
        let captain_name = captain_user.globalName ?? captain_user.username
        return [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(captain_name)
                .setDescription(`-`),
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("-")
                .setDescription(`-`),
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("-")
                .setDescription(`-`),
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("-")
                .setDescription(`-`),
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("-")
                .setDescription(`-`),
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("-")
                .setDescription(`-`),
        ]
    },

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
        .setMaxValues(2),


    class_selection_options_for_user: function (player){
        return new StringSelectMenuBuilder()
            .setCustomId(`my_selected_class`)
            .setPlaceholder("Choose Your Pro/Class Here")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Assassin').setValue('Assassin')
                    .setDescription('Deadly, quiet, invisible.'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Assault').setValue('Assault')
                    .setDescription('At the center of activity, driving the action.'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Gunner').setValue('Gunner')
                    .setDescription('The anchor of his team.'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Sniper').setValue('Sniper')
                    .setDescription('All fear the Sniper.'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Support').setValue('Support')
                    .setDescription('Quirky, Italian backbone to the team.'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Tank').setValue('Tank')
                    .setDescription('Modern day grunt.'),
            )
    },


    player_selection_options: async function (interaction){
        let available_players = await common.available_players_list(interaction)
        let options = available_players.map(player => {
            return new StringSelectMenuOptionBuilder().setLabel(player.name).setValue(player.name).setDescription(player.value)
        })

        if (!options || !options.length) {
            return null
        }

        return new StringSelectMenuBuilder()
            .setCustomId(`pick_player`)
            .setPlaceholder("Who will you add to your team?")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(...options)
    },
}