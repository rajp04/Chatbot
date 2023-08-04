const sendChatBtn = document.querySelector('.chat-input span')
const chatInput = document.querySelector('.chat-input input')
const chatbox = document.querySelector('.chatbox')
const chatToggler = document.querySelector('.chatbox-toggler')
const chatCloseBtn = document.querySelector('.close-btn')

let userMessage;
const API_KEY = '';  // Add your API KEY from open ai tools

const createChat = (message, className) => {
    //Create a chat li element with passed message and className
    const chats = document.createElement('li')
    chats.classList.add('chat', className);
    let chatContent = className === 'outgoing' ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`
    chats.innerHTML = chatContent;
    chats.querySelector('p').textContent = message; 
    return chats;
}

const generateResponse = (incomingChat) => {
    const API_URL = '';  // Add your API URL from open ai tools
    const messageElement = incomingChat.querySelector('p');

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{ role: 'user', content: userMessage }]
        })
    }

    //send Post Request to api, get response
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        }).catch(() => {
            messageElement.classList.add('error');
            messageElement.textContent = 'Oops! Something went wrong. Please try again';
    
        }).finally(()=>chatbox.scrollTo(0, chatbox.scrollHeight))
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    // console.log(userMessage)
    if (!userMessage) return;
    chatInput.value = '';

    //Append the user's message to the chatbox
    chatbox.appendChild(createChat(userMessage, 'outgoing'));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //display thinking message while waiting for the response
        const incomingChat = createChat('Thinking...', 'incoming')
        chatbox.appendChild(incomingChat);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChat);
    }, 600);
}

chatToggler.addEventListener('click', ()=>document.body.classList.toggle('show-chatbot'))
chatCloseBtn.addEventListener('click', ()=>document.body.classList.remove('show-chatbot'))
sendChatBtn.addEventListener('click', handleChat)