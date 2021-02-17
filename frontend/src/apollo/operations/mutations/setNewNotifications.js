import { setNewNotificationsVar } from "../../cache";

const setNewNotifications = setNewNotificationsVar => notificationId => setNewNotificationsVar(setNewNotificationsVar().add(notificationId))

export default setNewNotifications