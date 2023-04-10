import { postToChannel, sendToJoinClipBoard } from "../_utils"
import { clipboardChannelId } from "../_constants"

export async function app_message_received(req, res) {
    let event = req.body.event

    try {
        if (event.channel !== clipboardChannelId) {
            await postToChannel("bot-debug", res, `Message not from ${clipboardChannelId}, ignore the message`)
        } else {
            await sendToJoinClipBoard(JSON.stringify(event));
        }
    }
    catch (e) {
        console.log(e)
    }
}
