var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');



// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    console.log('in ready');
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    var ans = 0;
    var maxTotal = 0;
    var response = "";

    logger.info("bruh");

    console.log(message);


    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        
        var args = message.substring(1).split(' ');
                
        for(let j=0; j < args.length; j++){

        
            if(args[j].includes('r') && args[j].includes('d')){

                var result = args[j].split(/[rd]/i);
                var add = 0;
                var temp = args[j];
                var ans = 0;

               
                var count = Number(result[1]);
                var dice  = Number(result[2]);
               

                if(args[j].includes('+'))
                {
                    
                    result = temp.split(/[rd+]/i);
                    dice  = Number(result[2]);
                    add = Number(result[3]);
                    response = "```" + user + " Rolling " + count + " d" + dice + " + " + add + " :\n";
                }else{
                    response = "```" +  user + " Rolling " + count + " d" + dice + ":\n";
                }


                console.log(result)
                console.log(dice)

                for(let i = 0; i < count; i++){
                    var num = Math.floor(Math.random() * dice) + 1;
                    ans += num;
                    if(i == 0){
                        response = response + num;
                    }else{
                    response = response + " + " + num;
                    }

                   
                }

                if(args[j].includes('+')){
                    response = response + " + " + add ;
                    ans += add
                }

                maxTotal += ans;
                response = response + "\n = " + ans + "```";

                console.log(response);
                bot.sendMessage({to: channelID, message: response});
            }

           
        }

        if(args.length > 1){
            bot.sendMessage({to: channelID, message: "```" + user + " MAX TOTAL: " + maxTotal + "```"});
        }
       
    
     }
});
