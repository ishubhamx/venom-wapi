export async function sendLocation(
  chatId,
  latitude,
  longitude,
  location = null
) {
  const chat = await WAPI.sendExist(chatId);
  if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
    return WAPI.scope(
      chatId,
      true,
      null,
      'latitude and longitude must be numbers'
    );
  }
  if (!chat.erro) {
    const newMsgId = await window.WAPI.getNewMessageId(chat.id._serialized);
    const inChat = await WAPI.getchatId(chat.id).catch(() => {});
    const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();

    if (inChat) {
      chat.lastReceivedKey._serialized = inChat._serialized;
      chat.lastReceivedKey.id = inChat.id;
    }

    const message = {
      ack: 0,
      id: newMsgId,
      local: !0,
      self: 'out',
      t: parseInt(new Date().getTime() / 1000),
      to: chat.id,
      from: fromwWid,
      isNewMsg: !0,
      lat: Number(latitude),
      lng: Number(longitude),
      loc: location,
      type: 'location'
    };

    const result =
      (await Promise.all(Store.addAndSendMsgToChat(chat, message)))[1] || '';

    let m = {
        latitude: latitude,
        longitude: longitude,
        title: location,
        type: 'location'
      },
      obj;
    if (result == 'success' || result == 'OK') {
      obj = WAPI.scope(newMsgId, false, result, null);
      Object.assign(obj, m);
      return obj;
    } else {
      obj = WAPI.scope(newMsgId, true, result, null);
      Object.assign(obj, m);
      return obj;
    }
  } else {
    return chat;
  }
}
