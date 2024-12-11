const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const rewardDisplay = document.getElementById('reward-display');

// Rewards
const rewards = [
    "$10 Coupon",
    "$20 Discount",
    "$5 Cashback",
    "Free Shipping",
    "Extra 10% Off",
    "No Reward",
    "Gift Hamper",
    "$50 Voucher"
];

// Spin Functionality
let isSpun = localStorage.getItem('isSpun');

if (isSpun) {
    alert("You have already used the spinning wheel.");
    spinBtn.disabled = true;
}

spinBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        alert("Please fill in your details first.");
        return;
    }

    const spinAngle = Math.floor(Math.random() * 360) + 1440; // At least 4 full spins
    wheel.style.transform = `rotate(${spinAngle}deg)`;

    setTimeout(() => {
        const finalAngle = spinAngle % 360;
        const segmentIndex = Math.floor((360 - finalAngle) / (360 / rewards.length)) % rewards.length;
        const reward = rewards[segmentIndex];

        rewardDisplay.textContent = `Congratulations! You won: ${reward}`;

        // Send details to WhatsApp
        const whatsappMsg = `Hello, Admin! Winner Details:\nName: ${name}\nPhone: ${phone}\nReward: ${reward}`;
        const whatsappLink = `https://api.whatsapp.com/send?phone=9533224903&text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappLink, '_blank');

        localStorage.setItem('isSpun', true);
        spinBtn.disabled = true;
    }, 5000); // Match the transition duration
});
