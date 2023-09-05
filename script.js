const messageBtn = document.querySelector('.message');
const closeBtn = document.querySelector('.close-btn');
const chatBox = document.querySelector('.chat');
const userInput = document.querySelector('.user-text');
const chatBtn = document.querySelector('.chat-btn');
const userResponse = document.querySelector('.user-response');
const API_KEY = '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';

messageBtn.addEventListener('click', () => {
    chatBox.style.display = 'block';
    messageBtn.style.display = 'none';
    closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
    messageBtn.style.display = 'block';
    closeBtn.style.display = 'none';
});

chatBtn.addEventListener('click', () => {
    const userText = userInput.value;

    // Make a request to the OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            prompt: [{role: "user", content: userText}],
            // prompt: userText,
            // max_tokens: 50, 
        }),
    })
    .then(response => response.json())
    .then(data => {

        const userMessageElement = createUserMessage(userText)
        chatBox.insertBefore(userMessageElement, userInput.parentElement)

        // Display the bot's response above the input
        const botMessageElement = createBotMessage(data.choices[0].text);
        chatBox.insertBefore(botMessageElement, userInput.parentElement); // Insert before the user input container
    })
    .catch(error => {
        // Display an error message above the input
        const errorMessageElement = createBotMessage("Oops! Something went wrong. Please try again.");
        chatBox.insertBefore(errorMessageElement, userInput.parentElement); 
    });

    // Clear the input field
    userInput.value = '';

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
});

function createUserMessage(message) {
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'box user';
    userMessageElement.innerHTML = `<p class="user-response">${message}</p>`;
    return userMessageElement;
}

function createBotMessage(message) {
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'box robot';
    botMessageElement.innerHTML = `<i class="ri-robot-2-fill"></i><p class="bot-response">${message}</p>`;
    return botMessageElement;
}