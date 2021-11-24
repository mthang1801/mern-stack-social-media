import { checkStatusConversation } from './checkStatusConversation';
const initSockets = (io) => {
  checkStatusConversation(io);
};

export { initSockets };
