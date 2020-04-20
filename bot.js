// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    ActivityHandler
} = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        const price = 100;
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const text = +context.activity.text;
            const diff = price - text;
            if (diff < 0) {
                await context.sendActivity(`Great deal for us thanks a lot!!, your product will be sent and we will keep the extra money`);
            }

            if (text < 51) {
                await context.sendActivity(`Sorry ! Purchase is not possible at this price.`);
            } else if (text < 71) {
                await context.sendActivity(`Sorry , Can do better ! Purchase is not possible.`);
            } else if (text < 81) {
                await context.sendActivity(`Kindly increase the price range . Purchase not available at this price.`);
            } else if (text < 86) {
                await context.sendActivity(`Trust me the product is good , kindly increase the price range.`);
            } else if (text < 100) {
                await context.sendActivity(` Yay! Good choice ! Purchase successful.`);
            }
            // await context.sendActivity(JSON.stringify(context));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hey there !! Thanks for visiting , you can buy this product for 100$');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;