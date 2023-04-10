const axios = require('axios');
import { token, joinToken } from './_constants';

export function tokenizeString(string) {
    const array = string.split(" ").filter(element => {
        return element !== ""
    })
    console.log("Tokenized version:", array)
    return array
}

export async function postToChannel(channel, res, payload) {

    console.log("channel:", channel)
    var channelId = await channelNameToId(channel)

    console.log("ID:", channelId)

    const message = {
        channel: channelId,
        text: payload,
    }

    axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` },
        data: message,
    })
        .then(response => {
            console.log("data from axios:", response.data)
            res.json({ ok: true })
        })
        .catch(err => {
            console.log("axios Error:", err)
            res.send({
                "response_type": "ephemeral",
                "text": `${err.response.data.error}`
            })
        })

}

async function channelNameToId(channelName) {
    var generalId
    var id
    await axios({
        method: 'post',
        url: 'https://slack.com/api/conversations.list',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` },
    })
        .then(response => {
            response.data.channels.forEach(element => {

                if (element.name === channelName) {
                    id = element.id
                    return element.id
                }
                else if(element.name === "general") generalId = element.id
            });

            return generalId
        })
        .catch(err => {
            console.log("axios Error:", err)
        })

        return id
}
export async function sendToJoinClipBoard(res, content) {
    await debug(res, "will send to join with content "+content)
    await axios({
        method: 'get',
        url: 'https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush',
        params: { 
            deviceId: "group.all",
            apikey: joinToken,
            clipboard: test
        },
    })
        .then(response => {
            console.log("data from axios:", response.data)
        })
        .catch(err => {
            debug(res, "axios Error:"+ err)
        })
}


export async function debug(res, message) {
    try {
        await postToChannel("bot-debug", res, message)
    }
    catch (e) {
        console.log(e)
    }
}
