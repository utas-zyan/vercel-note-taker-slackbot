import { challenge } from './events_handlers/_challenge'
import { general_req } from './events_handlers/_app_general'
import { app_mention } from './events_handlers/_app_mention'
import { app_message_received } from './events_handlers/_app_messages'
import { channel_created } from './events_handlers/_channel_created'
import { validateSlackRequest } from './_validate'
import { signingSecret } from './_constants'
import {debug} from './_utils'

module.exports = async (req, res) => {
    var type = req.body.type
    await debug(res, JSON.stringify(req.body));
    if (type === "url_verification") {
        await challenge(req, res)
    }

    else if (validateSlackRequest(req, signingSecret)) {

        if (type === "event_callback") {
            var event_type = req.body.event.type

            switch (event_type) {
                case "app_mention": await app_mention(req, res); break;
                case "channel_created": await channel_created(req, res); break;
                case "message": await app_message_received(req, res); break;
                default: console.log("unhandled event" + event_type);
            }

        }
        else {
            console.log("body:", req.body)
        }
    }
}

