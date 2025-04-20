const powerKnob = document.getElementById('power-knob');
const volumeKnob = document.getElementById('volume-knob');
const screen = document.getElementById('screen');
const channelIcon = document.getElementById('channel-icon');
const powerSound = document.getElementById('power-sound');
const humSound = document.getElementById('hum-sound');
const buttons = document.querySelectorAll('.crt-btn');
let poweredOn = false;

powerKnob.addEventListener('click', () => {
    if (poweredOn) return;
    screen.classList.remove('off');
    screen.classList.add('booting');
    powerSound.play();

    setTimeout(() => {
        screen.classList.remove('booting');
        screen.classList.add('on');
        humSound.volume = 0.5;
        humSound.play();
        poweredOn = true;
        screen.querySelector('.screen-content').innerHTML = '<p>Main menu loaded.</p>';
    }, 1500);
});

let volumeLevel = 0.5;
let volumeRotation = 0;

volumeKnob.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    volumeLevel = Math.min(1, Math.max(0, volumeLevel + delta));
    humSound.volume = volumeLevel;

    volumeRotation += (delta > 0 ? 10 : -10);
    volumeKnob.style.transform = `rotate(${volumeRotation}deg)`;
});



buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (!poweredOn) return;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        channelIcon.textContent = `CH ${tab.toUpperCase()}`;
        channelIcon.classList.add('visible');

        // Load channel HTML
        const res = await fetch(`/channel/${tab}`);
        const html = await res.text();
        screen.querySelector('.screen-content').innerHTML = html;

        setTimeout(() => channelIcon.classList.remove('visible'), 2000);
    });
});

