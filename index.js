const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx)=>ctx.reply('هلا! ارسلي سؤال و Grok يجاوبك'));
bot.on('text', async (ctx)=>{
  try{
    await ctx.sendChatAction('typing');
    const r = await axios.post('https://api.x.ai/v1/chat/completions',
    {model:'grok-beta',messages:[{role:'user',content:ctx.message.text}]},
    {headers:{'Authorization':'Bearer '+process.env.GROK_API_KEY}});
    ctx.reply(r.data.choices[0].message.content.slice(0,4000));
  }catch(e){ctx.reply('خطأ');}
});
bot.launch();
console.log('Bot started');
