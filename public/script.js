requestAnimationFrame(() => {
    updateMessage();

    setInterval(updateMessage, 30000);
});

function updateMessage() {
    fetch(`/message?offset=${-1 * (new Date().getTimezoneOffset() * 60 * 1000)}`, { credentials: "include" })
        .then((res) => res.text())
        .then(message => document.querySelector('#message').innerText = message);
}