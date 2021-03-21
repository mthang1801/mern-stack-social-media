/**
 * 
 * @param {data} Object 
 */
const setInitialMessagesStorage = setMessagesStorageVar => data => setMessagesStorageVar({...data});

export default setInitialMessagesStorage;