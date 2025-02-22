var myYear = 0;
// 🖤 สร้างฟังก์ชันแสดงข้อความต้อนรับแบบ gothic 🖤
function displayGothicWelcomeMessage() {
    var user = Math.floor(Math.random() * 3); // Random number between 0 and 2
    var message;
    if (user == 1) {
        myYear += 15;
        message = "\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15 \uD83D\uDDA4 Welcome, lost soul, to the Gothic Realm \uD83D\uDDA4 \uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15 Here, shadows dance and whispers of the night Embrace your heart with eternal twilight. \uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15";
    }
    else if (user == 2) {
        myYear += 20;
        message = "\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15 \uD83D\uDDA4 Greetings, wanderer, to the Gothic Sanctuary \uD83D\uDDA4 \uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15 Where the moon's glow guides your path And the night's embrace is your eternal bath. \uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15";
    }
    else {
        myYear += 30;
        message = "\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15 \uD83D\uDDA4 Welcome to the Gothic Realm \uD83D\uDDA4 \uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15\uD83C\uDF11\uD83C\uDF15";
    }
    console.log(message);
    // ถ้า myYear == 45 จะมีประโยคพูดขอบคุณแสดงมา (ให้ขอบคุณ as Cute Goth girl like shes hot rightnow)
    if (myYear == 45) {
        console.log("🖤 Thank you, dear wanderer, for embracing the shadows with me. 🖤");
    }
    //myYear == 50 (like angry Goth girl rejecting some boy)
}
// Call the function multiple times to test the random messages
displayGothicWelcomeMessage();
displayGothicWelcomeMessage();
displayGothicWelcomeMessage();
