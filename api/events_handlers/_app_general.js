import { postToChannel } from "../_utils"


export async function general_req(req, res) {
    let event = req.body.event

    try {
        await postToChannel("general", res, `Hi there! Thanks for mentioning me, <@${event.user}>!`)
    }
    catch (e) {
        console.log(e)
    }
}
