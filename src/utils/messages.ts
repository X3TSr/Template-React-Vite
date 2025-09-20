const MESSAGE_DURATION: number = 3000;

interface Message {
    type: 'general' | 'info' | 'success' | 'warning' | 'error';
    text: string;
}

export const MessageUtils = {
    showMessage: (message: Message): void => {
        const box = document.createElement('div');
        box.className = `message-box message-${message.type}`;
        box.textContent = message.text;
        document.body.appendChild(box);

        setTimeout(() => {
            box.style.display = 'none';
            document.body.removeChild(box);
        }, MESSAGE_DURATION);

        box.addEventListener('click', () => {
            box.style.display = 'none';
            document.body.removeChild(box);
        });
    }
}