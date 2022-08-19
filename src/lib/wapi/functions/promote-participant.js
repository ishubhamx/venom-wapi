export async function promoteParticipant(groupId, contactsId) {
  const chat = window.Store.WidFactory.createWid(groupId);

  if (!Array.isArray(contactsId)) {
    contactsId = [contactsId];
  }

  contactsId = await Promise.all(contactsId.map((c) => WAPI.sendExist(c)));
  contactsId = contactsId.filter((c) => !c.erro && c.isUser).map((c) => c.id);

  if (!contactsId.length) {
    return false;
  }

  const participants = contactsId.map((p) =>
    window.Store.WidFactory.createWid(p)
  );

  return window.Store.sendPromoteParticipants(chat, participants);
}
