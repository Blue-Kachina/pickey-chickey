const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

module.exports = {

    mnc_logo: new AttachmentBuilder('./assets/logo_mnc.png')
        .setName('logo_mnc.png'),

    intro_embed: function (author){
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Who Wants Bacon?")
            .setDescription("Hiyo Everybody.  It's time to make sure that we know who's ready to play.  Let us know your pro/class preferences so that we can begin.")
            .setAuthor({name: (author.globalName ?? author.username)})
            .setImage('attachment://logo_mnc.png')
            .setTimestamp()
            // .setFields([
            //     {name: 'Checked-in', value: (author.globalName ?? author.username)},
            // ])
            .setFooter({text: 'Why are chickens funny?'})
    },

    checked_in_users_embed: function (){
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Chickins`)
            .setDescription("People who have already checked-in will be listed below")
            .setTimestamp()
    },

    class_selection_options: new StringSelectMenuBuilder()
        .setCustomId('class_selection')
        .setPlaceholder("Choose Pros Here")
        .setMinValues(1)
        .setMaxValues(6)
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
}