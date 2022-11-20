export function isMessagesDataNewest(fetchedMessages, stateMessages) {
    const fetchedLastMessageId = getLastElementKey(fetchedMessages);
    const stateLastMessageId = getLastElementKey(stateMessages);
    return fetchedLastMessageId === stateLastMessageId;
}

export function isOnlineUsersDataNewest(fetchedOnlineUsers, stateOnlineUsers) {
    const fetchedLastOnlineUser = getLastElementKey(fetchedOnlineUsers);
    const stateLastOnlineUser = getLastElementKey(stateOnlineUsers);
    return (fetchedLastOnlineUser === stateLastOnlineUser && Object.keys(fetchedOnlineUsers).length === Object.keys(stateOnlineUsers).length)
}

function getLastElementKey (jsonData) {
    const arr =  Object.keys(jsonData);
    return arr[arr.length - 1];
}