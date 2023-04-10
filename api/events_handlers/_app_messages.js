import { postToChannel } from "../_utils"


export async function app_message_received(req, res) {
    let event = req.body.event

    try {
        await postToChannel("bot-debug", res, `A new message\`${JSON.stringify(event.channel)}\`!`)
        
    }
    catch (e) {
        console.log(e)
    }
}
