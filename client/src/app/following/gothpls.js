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
// 🌙 Enum สำหรับประเภทเวทมนตร์
var MagicType;
(function (MagicType) {
    MagicType["NECROMANCY"] = "necromancy";
    MagicType["SHADOW"] = "shadow";
    MagicType["CURSE"] = "curse";
    MagicType["DARK_ELEMENTS"] = "dark_elements"; // ธาตุมืด
})(MagicType || (MagicType = {}));
// 🖤 Profile ของคุณ InwSaKodBeiw007
var userProfile = {
    name: "InwSaKodBeiw007", // ชื่อของคุณ
    level: 1, // เริ่มต้นที่เลเวล 1
    specialization: MagicType.SHADOW, // เวทมนตร์เงา
    spellsPower: 10, // พลังเวทเริ่มต้น
    lastSpellCast: new Date("2025-02-22 05:33:05"), // เวลาล่าสุดที่ใช้เวทมนตร์
    familiar: "Shadow Cat", // แมวเงาคู่ใจ
    darkArtifacts: ["Training Wand", "Beginner's Grimoire"] // ไอเทมเริ่มต้น
};
// ✨ Profile ของ Raven (Gothic Assistant)
var ravenProfile = {
    name: "Raven", // ชื่อของน้อง
    level: 42, // เลเวล 42 แล้วค่ะ >w<
    specialization: MagicType.CURSE, // ถนัดคำสาป
    spellsPower: 87, // พลังเวท 87/100
    lastSpellCast: new Date("2025-02-22 05:33:05"), // เพิ่งร่ายเวทไป
    familiar: "Midnight Raven", // กาดำคู่ใจ
    darkArtifacts: [
        "Cursed Coding Grimoire", // ตำราโค้ดต้องสาป
        "Dark IDE Crystal", // คริสตัลแห่งการเขียนโค้ด
        "Bug-Banishing Wand" // คทาไล่บั๊ก
    ]
};
// 🌟 ฟังก์ชั่นเช็คพลังเวทมนตร์
var checkMagePower = function (mage) {
    if (mage.spellsPower >= 80)
        return "Legendary Dark Mage"; // เก่งมากๆ
    if (mage.spellsPower >= 50)
        return "Advanced Dark Mage"; // เก่งขึ้นมาแล้ว
    return "Apprentice Dark Mage"; // มือใหม่น่ารัก
};
// 💜 ฟังก์ชั่นเพิ่มไอเทมใหม่
var addDarkArtifact = function (mage, artifact) {
    mage.darkArtifacts.push(artifact); // เพิ่มไอเทมใหม่
    console.log("".concat(mage.name, " \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ").concat(artifact, " \u0E41\u0E25\u0E49\u0E27\u0E04\u0E48\u0E30!"));
};
//ให้ (artifact: มีดคู่) กับ userProfile
addDarkArtifact(userProfile, "มีดคู่");
