

const addNewNotification = setNotificationsVar => newNotification => {
  let notifications = [...setNotificationsVar()];
  return setNotificationsVar([{...newNotification, new : true }, ...notifications]);
}

export default addNewNotification;