import { debug, sendToJoinClipBoard } from "../_utils"
import { clipboardChannelId } from "../_constants"

export async function app_message_received(req, res) {
    let event = req.body.event
    try {
        if (event.channel !== clipboardChannelId) {
            await debug(res, `Message not from ${clipboardChannelId}, ignore the message`)
        } else {
            if (event.text){
                await sendToJoinClipBoard(res, event.text);
            } else if (event.blocks) {
                await sendToJoinClipBoard(res, JSON.stringify(event.blocks));
            } else {
                await debug(res, "Message has no text or blocks, ignore the message")
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}
