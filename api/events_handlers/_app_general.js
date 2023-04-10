import { postToChannel } from "../_utils"


export async function general_req(req, res) {
    let event = req.body.event

    try {
        await postToChannel("bot-debug", res, `${event}`)
    }
    catch (e) {
        console.log(e)
    }
}
