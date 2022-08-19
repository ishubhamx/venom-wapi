export function allNewMessagesListener() {
  window.WAPI.allNewMessagesListener = (callback) =>
    window.WAPI.waitForStore(['Chat', 'Msg'], () => {
      window.Store.Msg.on('add', (newMessage) => {
        if (newMessage && newMessage.isNewMsg) {
          setTimeout(function () {
            let message = window.WAPI.processMessageObj(
              newMessage,
              true,
              false
            );
            if (message) {
              callback(message);
            }
          }, 3000);
        }
      });
    });
}
