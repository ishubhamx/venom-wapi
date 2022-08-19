
export async function sendMessage(to, content) {
  if (typeof content != 'string' || content.length === 0) {
    return WAPI.scope(
      undefined,
      true,
      null,
      'It is necessary to write a text!'
    );
  }
  if (typeof to != 'string' || to.length === 0) {
    return WAPI.scope(to, true, 404, 'It is necessary to number');
  }

  let chat = await WAPI.sendExist(to);

  if (chat && chat.status != 404 && chat.id) {
    const m = { type: 'sendText', text: content };
    const newMsgId = await window.WAPI.getNewMessageId(chat.id._serialized);
    const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();

    let inChat = await WAPI.getchatId(chat.id).catch(() => {
      return WAPI.scope(chat.id, true, 404, 'Error to number ' + to);
    });

    if (inChat) {
      chat.lastReceivedKey && chat.lastReceivedKey._serialized
        ? (chat.lastReceivedKey._serialized = inChat._serialized)
        : '';
      chat.lastReceivedKey && chat.lastReceivedKey.id
        ? (chat.lastReceivedKey.id = inChat.id)
        : '';
    }

    if (!newMsgId) {
      return WAPI.scope(to, true, 404, 'Error to newId');
    }

    const message = {
      id: newMsgId,
      ack: 0,
      body: content,
      from: fromwWid,
      to: chat.id,
      local: !0,
      self: 'out',
      t: parseInt(new Date().getTime() / 1000),
      isNewMsg: !0,
      type: 'chat'
    };

    try {
      var result = (
        await Promise.all(window.Store.addAndSendMsgToChat(chat, message))
      )[1];

      if (result === 'success' || result === 'OK') {
        let obj = WAPI.scope(newMsgId, false, result, content);
        Object.assign(obj, m);
        return obj;
      }
    } catch (e) {
      let obj = WAPI.scope(newMsgId, true, result, 'The message was not sent');
      Object.assign(obj, m);
      return obj;
    }

    let obj = WAPI.scope(newMsgId, true, result, content);
    Object.assign(obj, m);
    return obj;
  } else {
    if (!chat.erro) {
      chat.erro = true;
    }
    return chat;
  }
}
