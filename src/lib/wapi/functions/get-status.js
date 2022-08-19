export async function getStatus(id) {
  const contactID = Store.WidFactory.createWid(id);
  return await Store.MyStatus.getStatus(contactID);
}
