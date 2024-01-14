const {AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

module.exports = {

    mnc_logo: new AttachmentBuilder('./assets/logo_mnc.png')
        .setName('logo_mnc.png'),

    chickin_button: new ButtonBuilder()
        .setCustomId('chickin')
        .setLabel('Toggle Your Checkin Status')
        .setStyle(ButtonStyle.Primary),

    chickin_thread_embed: function (author){
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Who Wants Bacon?")
            .setDescription("Hiyo Everybody.  It's time to make sure that we know who's ready to play.  Please chick-in by clucking the button below")
            .setAuthor({name: (author.globalName ?? author.username)})
            .setImage('attachment://logo_mnc.png')
            .setTimestamp()
            .setFields([
                {name: 'Checked-in', value: (author.globalName ?? author.username)},
            ])
            .setFooter({text: 'Why are chickens funny?'})
    },

    class_selection_options: new StringSelectMenuBuilder()
        .setCustomId('class_selection')
        .setPlaceholder("Choose which classes you're willing to play as")
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