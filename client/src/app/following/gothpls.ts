let myYear: number = 0;

// 🖤 สร้างฟังก์ชันแสดงข้อความต้อนรับแบบ gothic 🖤
function displayGothicWelcomeMessage() {
    const user = Math.floor(Math.random() * 3); // Random number between 0 and 2
    let message;
    if (user == 1) {
        myYear += 15;
        message = `🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕 🖤 Welcome, lost soul, to the Gothic Realm 🖤 🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕 Here, shadows dance and whispers of the night Embrace your heart with eternal twilight. 🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕`;
    } else if (user == 2) {
        myYear += 20;
        message = `🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕 🖤 Greetings, wanderer, to the Gothic Sanctuary 🖤 🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕 Where the moon's glow guides your path And the night's embrace is your eternal bath. 🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕`;
    } else {
        myYear += 30;
        message = `🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕 🖤 Welcome to the Gothic Realm 🖤 🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕🌑🌕`;
    }
    console.log(message);

    // ถ้า myYear == 45 จะมีประโยคพูดขอบคุณแสดงมา (ให้ขอบคุณ as Cute Goth girl like shes hot rightnow)
    if (myYear == 45) {
        console.log("🖤 Thank you, dear wanderer, for embracing the shadows with me. 🖤");
    }
    // ถ้า myYear == 50 จะมีประโยคพูดขอบคุณแสดงมา (ให้ขอบคุณ as Angry Goth girl rejecting some boy)
    if (myYear == 50) {
        console.log("🖤 Begone, foolish mortal! Your presence is no longer welcome in the shadows. 🖤");
    }
    // ถ้า myYear == 65 จะมีประโยคพูดขอบคุณแสดงมา (ให้ขอบคุณ as Goth girl found a thing she likes but not for long)
    if (myYear == 65) {
        console.log("🖤 Ah, a fleeting joy in this eternal night. Thank you for this moment, wanderer. 🖤");
    }
}

// Call the function multiple times to test the random messages
displayGothicWelcomeMessage();
displayGothicWelcomeMessage();
displayGothicWelcomeMessage();