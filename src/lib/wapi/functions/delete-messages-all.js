
export async function deleteMessagesAll(chatId, messageArray, onlyLocal) {
  var userId = new Store.WidFactory.createWid(chatId);

  let conversation = WAPI.getChat(userId);
  if (!conversation) return false;

  if (!Array.isArray(messageArray)) {
    messageArray = [messageArray];
  }

  let messagesToDelete = messageArray
    .map((msgId) =>
      typeof msgId == 'string' ? window.Store.Msg.get(msgId) : msgId
    )
    .filter((x) => x);
  if (!messagesToDelete) return true;
  let jobs = onlyLocal
    ? [
        conversation.sendDeleteMsgs
          ? conversation.sendDeleteMsgs(messagesToDelete, conversation)
          : Store.WapDeleteMsg.sendDeleteMsgs(conversation, messagesToDelete)
      ]
    : [
        conversation.sendRevokeMsgs
          ? conversation.sendRevokeMsgs(
              messagesToDelete.filter((msg) => msg.isSentByMe),
              conversation
            )
          : Store.WapDeleteMsg.sendRevokeMsgs(
              conversation,
              messagesToDelete.filter((msg) => msg.isSentByMe),
              true
            ),
        conversation.sendDeleteMsgs
          ? conversation.sendDeleteMsgs(
              messagesToDelete.filter((msg) => !msg.isSentByMe),
              conversation
            )
          : Store.WapDeleteMsg.sendDeleteMsgs(
              conversation,
              messagesToDelete.filter((msg) => !msg.isSentByMe)
            )
      ];
  return Promise.all(jobs).then((_) => true);
}
