import i18n from "../i18n"

const notificationContent = (field, action, lang) => {
  const {translation} = i18n.store.data[lang];
  if (field === "post" && action === "CREATED") {
    return translation.notifications.postCreated;
  }
}

export default notificationContent