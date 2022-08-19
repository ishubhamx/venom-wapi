
export async function deleteMessagesMe(chatId, messageArray, revoke) {
  let userId = new window.Store.UserConstructor(chatId, {
    intentionallyUsePrivateConstructor: true
  });
  let conversation = window.Store.Chat.get(chatId);

  if (!conversation) return false;

  if (!Array.isArray(messageArray)) {
    messageArray = [messageArray];
  }

  let messagesToDelete = messageArray.map((msgId) =>
    window.Store.Msg.get(msgId)
  );

  if (revoke) {
    conversation.sendRevokeMsgs(messagesToDelete, conversation);
  } else {
    conversation.sendDeleteMsgs(messagesToDelete, conversation);
  }

  return true;
}
