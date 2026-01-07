const startBtn = document.getElementById('startBtn');
const message = document.getElementById('message');

const state = {
    status: 'idle', // idle | waiting | ready | done
    startTime: null,
};

startBtn.addEventListener('click', () => {
    if (state.status !== 'idle') return;

    state.status = 'waiting';
    message.textContent = 'Wait for green...';
    document.body.style.backgroundColor = 'red';

    const delay = Math.random() * 3000 + 2000;

    setTimeout(() => {
        state.status = 'ready';
        state.startTime = Date.now();
        message.textContent = 'CLICK NOW!';
        document.body.style.backgroundColor = 'green';
    }, delay);
});

document.body.addEventListener('click', () => {
    if (state.status !== 'ready') return;

    const reactionTime = Date.now() - state.startTime;

    message.textContent = `Your reaction time: ${reactionTime} ms`;
    document.body.style.backgroundColor = '#ffffff';
    state.status = 'done';
});
