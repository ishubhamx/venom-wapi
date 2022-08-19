export async function loadChatEarlierMessages(id) {
  const chat = WAPI.getChat(id);
  if (chat) {
    const someEarlierMessages =
      await window.Store.ConversationMsgs.loadEarlierMsgs(chat);
    if (someEarlierMessages)
      return someEarlierMessages.map(WAPI._serializeMessageObj);
  }
  return false;
}
