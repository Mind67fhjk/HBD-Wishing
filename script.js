// DOM elements
const nameInput = document.getElementById('name-input');
const updateMessageBtn = document.getElementById('update-message-btn');
const personalizedMessage = document.getElementById('personalized-message');
const celebrationElement = document.getElementById('celebration-element');
const musicToggle = document.getElementById('music-toggle');

// New feature elements
const countdownSection = document.getElementById('countdown-section');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const photoUpload = document.getElementById('photo-upload');
const addPhotoBtn = document.getElementById('add-photo-btn');
const slideshowBtn = document.getElementById('slideshow-btn');
const galleryGrid = document.getElementById('gallery-grid');

const guestNameInput = document.getElementById('guest-name');
const guestMessageInput = document.getElementById('guest-message');
const addMessageBtn = document.getElementById('add-message-btn');
const messagesWall = document.getElementById('messages-wall');

const startQuizBtn = document.getElementById('start-quiz-btn');
const quizContent = document.getElementById('quiz-content');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizResult = document.getElementById('quiz-result');

const shareLink = document.getElementById('share-link');
const copyLinkBtn = document.getElementById('copy-link-btn');
const shareFacebook = document.getElementById('share-facebook');
const shareTwitter = document.getElementById('share-twitter');
const shareWhatsapp = document.getElementById('share-whatsapp');

const slideshowModal = document.getElementById('slideshow-modal');
const slideshowImage = document.getElementById('slideshow-image');
const closeSlideshow = document.getElementById('close-slideshow');
const prevSlide = document.getElementById('prev-slide');
const nextSlide = document.getElementById('next-slide');
const pauseSlideshow = document.getElementById('pause-slideshow');

// Data storage
let photos = [];
let messages = [];
let currentSlideIndex = 0;
let slideshowInterval = null;
let currentQuizIndex = 0;
let quizScore = 0;

// Sophisticated birthday messages
const defaultMessage = "Wishing you a day filled with joy, laughter, and everything your heart desires.";
const personalizedMessages = [
    "Happy Birthday, {name}! May this new year of life bring you endless possibilities and beautiful moments.",
    "Celebrating you today, {name}! Wishing you a year filled with love, success, and cherished memories.",
    "Happy Birthday, {name}! May your special day be as wonderful and extraordinary as you are.",
    "To {name}, on your birthday: May every moment be filled with happiness and every dream come true.",
    "Happy Birthday, {name}! Here's to another year of growth, adventure, and beautiful discoveries.",
    "Wishing {name} the most magnificent birthday! May this year exceed all your expectations.",
    "Happy Birthday, {name}! May your journey ahead be illuminated with joy and success."
];

// Quiz questions
const quizQuestions = [
    {
        question: "What makes this person special to you?",
        options: ["Their kindness", "Their humor", "Their wisdom", "All of the above"],
        correct: 3
    },
    {
        question: "What's the best birthday gift for them?",
        options: ["Something handmade", "An experience", "Something practical", "A surprise"],
        correct: 1
    },
    {
        question: "How would you describe their personality?",
        options: ["Adventurous", "Caring", "Creative", "Inspiring"],
        correct: 3
    }
];

// Celebration icons that rotate
const celebrationIcons = ['✨', '🌟', '💫', '⭐', '🎊', '🥂', '🎭', '🎪'];
let currentIconIndex = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createFloatingStars();
    setupMessagePersonalization();
    setupCelebrationElement();
    setupMusicToggle();
    setupCountdownTimer();
    setupPhotoGallery();
    setupGuestbook();
    setupQuiz();
    setupSharing();
    addSmoothScrolling();
    createSubtleParticles();
    loadStoredData();
    initializeGalleryPlaceholder();
    initializeGuestbookPlaceholder();
});

// Countdown Timer Functionality
function setupCountdownTimer() {
    // Set target date (you can modify this)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Birthday has arrived!
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            document.querySelector('.countdown-text').textContent = 'Happy Birthday! 🎉';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Photo Gallery Functionality
function setupPhotoGallery() {
    addPhotoBtn.addEventListener('click', () => {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', handlePhotoUpload);
    slideshowBtn.addEventListener('click', startSlideshow);
    
    // Slideshow controls
    closeSlideshow.addEventListener('click', closeSlideshow);
    prevSlide.addEventListener('click', () => changeSlide(-1));
    nextSlide.addEventListener('click', () => changeSlide(1));
    pauseSlideshow.addEventListener('click', toggleSlideshow);
    
    // Close modal when clicking outside
    slideshowModal.addEventListener('click', (e) => {
        if (e.target === slideshowModal) {
            closeSlideshowModal();
        }
    });
}

function handlePhotoUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name,
                    timestamp: new Date().toISOString()
                };
                photos.push(photoData);
                addPhotoToGallery(photoData);
                saveToStorage();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Clear the input
    photoUpload.value = '';
}

function addPhotoToGallery(photoData) {
    // Remove placeholder if it exists
    const placeholder = galleryGrid.querySelector('.gallery-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    const photoElement = document.createElement('div');
    photoElement.className = 'gallery-item';
    photoElement.innerHTML = `
        <img src="${photoData.src}" alt="${photoData.name}" loading="lazy">
    `;
    
    photoElement.addEventListener('click', () => {
        currentSlideIndex = photos.findIndex(p => p.id === photoData.id);
        openSlideshowModal();
    });
    
    galleryGrid.appendChild(photoElement);
}

function initializeGalleryPlaceholder() {
    if (photos.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-placeholder">
                📸
                <p>No photos yet. Click "Add Photos" to start your memory gallery!</p>
            </div>
        `;
    }
}

function startSlideshow() {
    if (photos.length > 0) {
        currentSlideIndex = 0;
        openSlideshowModal();
    }
}

function openSlideshowModal() {
    if (photos.length > 0) {
        slideshowModal.style.display = 'block';
        showSlide(currentSlideIndex);
        startAutoSlideshow();
    }
}

function closeSlideshowModal() {
    slideshowModal.style.display = 'none';
    stopAutoSlideshow();
}

function showSlide(index) {
    if (photos.length > 0) {
        slideshowImage.src = photos[index].src;
        slideshowImage.alt = photos[index].name;
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= photos.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = photos.length - 1;
    showSlide(currentSlideIndex);
}

function startAutoSlideshow() {
    stopAutoSlideshow();
    if (photos.length > 1) {
        slideshowInterval = setInterval(() => {
            changeSlide(1);
        }, 3000);
    }
}

function stopAutoSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopAutoSlideshow();
        pauseSlideshow.textContent = '▶️';
    } else {
        startAutoSlideshow();
        pauseSlideshow.textContent = '⏸️';
    }
}

// Guestbook Functionality
function setupGuestbook() {
    addMessageBtn.addEventListener('click', addGuestMessage);
    
    // Add emoji functionality
    document.querySelectorAll('.emoji-option').forEach(emoji => {
        emoji.addEventListener('click', () => {
            guestMessageInput.value += emoji.dataset.emoji;
            guestMessageInput.focus();
        });
    });
    
    // Allow Enter to submit (Shift+Enter for new line)
    guestMessageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addGuestMessage();
        }
    });
}

function addGuestMessage() {
    const name = guestNameInput.value.trim();
    const message = guestMessageInput.value.trim();
    
    if (name && message) {
        const messageData = {
            id: Date.now(),
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        messages.unshift(messageData); // Add to beginning
        addMessageToWall(messageData);
        saveToStorage();
        
        // Clear inputs
        guestNameInput.value = '';
        guestMessageInput.value = '';
        
        // Remove placeholder if it exists
        const placeholder = messagesWall.querySelector('.messages-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
    }
}

function addMessageToWall(messageData) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    
    const date = new Date(messageData.timestamp);
    const timeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-author">${escapeHtml(messageData.name)}</span>
            <span class="message-time">${timeString}</span>
        </div>
        <div class="message-content">${escapeHtml(messageData.message)}</div>
    `;
    
    messagesWall.insertBefore(messageElement, messagesWall.firstChild);
}

function initializeGuestbookPlaceholder() {
    if (messages.length === 0) {
        messagesWall.innerHTML = `
            <div class="messages-placeholder" style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 2rem;">
                💌
                <p style="margin-top: 1rem;">No messages yet. Be the first to leave a birthday wish!</p>
            </div>
        `;
    }
}

// Quiz Functionality
function setupQuiz() {
    startQuizBtn.addEventListener('click', startQuiz);
}

function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    startQuizBtn.style.display = 'none';
    quizResult.style.display = 'none';
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuizIndex];
        quizQuestion.textContent = question.question;
        
        quizOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectQuizOption(index));
            quizOptions.appendChild(optionElement);
        });
    } else {
        showQuizResult();
    }
}

function selectQuizOption(selectedIndex) {
    const question = quizQuestions[currentQuizIndex];
    const options = quizOptions.querySelectorAll('.quiz-option');
    
    // Remove previous selections
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Mark selected option
    options[selectedIndex].classList.add('selected');
    
    // Check if correct
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    
    // Move to next question after a delay
    setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
    }, 1000);
}

function showQuizResult() {
    quizQuestion.textContent = 'Quiz Complete!';
    quizOptions.innerHTML = '';
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let resultText = '';
    
    if (percentage >= 80) {
        resultText = `Excellent! You scored ${quizScore}/${quizQuestions.length} (${percentage}%). You know them very well! 🌟`;
    } else if (percentage >= 60) {
        resultText = `Good job! You scored ${quizScore}/${quizQuestions.length} (${percentage}%). You're a great friend! 🎉`;
    } else {
        resultText = `You scored ${quizScore}/${quizQuestions.length} (${percentage}%). There's always more to learn about each other! 💫`;
    }
    
    quizResult.innerHTML = `<h3>Your Result</h3><p>${resultText}</p>`;
    quizResult.style.display = 'block';
    
    // Show restart button
    setTimeout(() => {
        startQuizBtn.textContent = 'Take Quiz Again';
        startQuizBtn.style.display = 'block';
    }, 2000);
}

// Sharing Functionality
function setupSharing() {
    // Set the current page URL
    shareLink.value = window.location.href;
    
    copyLinkBtn.addEventListener('click', copyShareLink);
    shareFacebook.addEventListener('click', () => shareToSocial('facebook'));
    shareTwitter.addEventListener('click', () => shareToSocial('twitter'));
    shareWhatsapp.addEventListener('click', () => shareToSocial('whatsapp'));
}

function copyShareLink() {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        copyLinkBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyLinkBtn.textContent = 'Copy Link';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy link:', err);
    }
}

function shareToSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join me in celebrating this special birthday! 🎉');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Message personalization with elegant transitions
function setupMessagePersonalization() {
    updateMessageBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        if (name) {
            const randomMessage = personalizedMessages[Math.floor(Math.random() * personalizedMessages.length)];
            const newMessage = randomMessage.replace('{name}', name);
            
            // Elegant message transition
            personalizedMessage.style.opacity = '0';
            personalizedMessage.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                personalizedMessage.textContent = newMessage;
                personalizedMessage.style.opacity = '1';
                personalizedMessage.style.transform = 'translateY(0)';
                createElegantCelebration();
                nameInput.value = '';
            }, 300);
            
        } else {
            // Subtle shake animation for empty input
            nameInput.style.animation = 'gentleShake 0.5s ease-in-out';
            setTimeout(() => {
                nameInput.style.animation = '';
            }, 500);
        }
    });
    
    // Allow Enter key to trigger message update
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateMessageBtn.click();
        }
    });
    
    // Add elegant focus effects
    nameInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    nameInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}

// Setup celebration element with sophisticated interactions
function setupCelebrationElement() {
    celebrationElement.addEventListener('click', function() {
        // Rotate through celebration icons
        currentIconIndex = (currentIconIndex + 1) % celebrationIcons.length;
        
        // Elegant icon transition
        this.style.transform = 'scale(0.8) rotate(180deg)';
        this.style.opacity = '0.5';
        
        setTimeout(() => {
            this.textContent = celebrationIcons[currentIconIndex];
            this.style.transform = 'scale(1.2) rotate(0deg)';
            this.style.opacity = '1';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }, 150);
        
        createElegantCelebration();
        createWishEffect();
    });
    
    // Add hover effects
    celebrationElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    celebrationElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Setup music toggle with refined styling
function setupMusicToggle() {
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            this.textContent = '🎼';
            this.classList.add('active');
        } else {
            this.textContent = '🎵';
            this.classList.remove('active');
        }
        
        // Elegant button animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        createSoundWaves();
    });
}

// Utility Functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function saveToStorage() {
    try {
        localStorage.setItem('birthdayPhotos', JSON.stringify(photos));
        localStorage.setItem('birthdayMessages', JSON.stringify(messages));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadStoredData() {
    try {
        const storedPhotos = localStorage.getItem('birthdayPhotos');
        const storedMessages = localStorage.getItem('birthdayMessages');
        
        if (storedPhotos) {
            photos = JSON.parse(storedPhotos);
            photos.forEach(photo => addPhotoToGallery(photo));
        }
        
        if (storedMessages) {
            messages = JSON.parse(storedMessages);
            messages.forEach(message => addMessageToWall(message));
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}

// Create floating stars for ambient effect
function createFloatingStars() {
    const starCount = 15;
    
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            createFloatingStar();
        }, i * 200);
    }
    
    // Continuously create new stars
    setInterval(createFloatingStar, 3000);
}

function createFloatingStar() {
    const star = document.createElement('div');
    star.className = 'floating-star';
    star.textContent = '✦';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.animationDuration = (3 + Math.random() * 3) + 's';
    
    document.body.appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
        if (star.parentNode) {
            star.remove();
        }
    }, 8000);
}

// Elegant celebration effect
function createElegantCelebration() {
    const colors = ['#d4af37', '#f4d03f', '#ffffff', '#e8e8e8'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = `0 0 6px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 80 + Math.random() * 40;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `elegantBurst 2s ease-out forwards`;
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Create wish effect
function createWishEffect() {
    const wish = document.createElement('div');
    wish.textContent = '✨ Make a wish ✨';
    wish.style.position = 'fixed';
    wish.style.left = '50%';
    wish.style.top = '30%';
    wish.style.transform = 'translateX(-50%)';
    wish.style.color = '#d4af37';
    wish.style.fontSize = '1.2rem';
    wish.style.fontFamily = 'Playfair Display, serif';
    wish.style.fontWeight = '500';
    wish.style.pointerEvents = 'none';
    wish.style.zIndex = '1000';
    wish.style.opacity = '0';
    wish.style.animation = 'wishAppear 3s ease-in-out forwards';
    wish.style.textShadow = '0 2px 10px rgba(212, 175, 55, 0.5)';
    
    document.body.appendChild(wish);
    
    setTimeout(() => {
        wish.remove();
    }, 3000);
}

// Create sound waves effect for music toggle
function createSoundWaves() {
    const waves = 3;
    const musicRect = musicToggle.getBoundingClientRect();
    const centerX = musicRect.left + musicRect.width / 2;
    const centerY = musicRect.top + musicRect.height / 2;
    
    for (let i = 0; i < waves; i++) {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.left = centerX + 'px';
        wave.style.top = centerY + 'px';
        wave.style.width = '20px';
        wave.style.height = '20px';
        wave.style.border = '2px solid rgba(212, 175, 55, 0.6)';
        wave.style.borderRadius = '50%';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '999';
        wave.style.animation = `soundWave 1.5s ease-out forwards`;
        wave.style.animationDelay = (i * 0.2) + 's';
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 1500);
    }
}

// Create subtle background particles
function createSubtleParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = 'subtleFloat 8s linear forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }, 500);
}

// Add smooth scrolling behavior
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes gentleShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
    }
    
    @keyframes elegantBurst {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translate(var(--vx), var(--vy)) scale(0);
        }
    }
    
    @keyframes wishAppear {
        0% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px) scale(0.8);
        }
        20% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1);
        }
        80% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-20px) scale(0.8);
        }
    }
    
    @keyframes soundWave {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    @keyframes subtleFloat {
        0% { 
            opacity: 0;
            transform: translateY(0);
        }
        10% { 
            opacity: 1;
        }
        90% { 
            opacity: 1;
        }
        100% { 
            opacity: 0;
            transform: translateY(-100vh);
        }
    }
`;
document.head.appendChild(style);

// Add elegant page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

