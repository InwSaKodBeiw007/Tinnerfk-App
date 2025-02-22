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

// 🦇 Interface สำหรับ Dark Mage ค่ะ
interface DarkMage {
    name: string;              // ชื่อของ Dark Mage
    level: number;             // เลเวลความเก่ง
    specialization: MagicType; // ประเภทเวทมนตร์ที่ถนัด
    spellsPower: number;       // พลังเวทมนตร์ (1-100)
    lastSpellCast: Date;       // เวลาร่ายเวทครั้งล่าสุด
    familiar: string;          // สัตว์เลี้ยงคู่ใจ
    darkArtifacts: string[];   // ไอเทมเวทมนตร์ที่มี
}

// 🌙 Enum สำหรับประเภทเวทมนตร์
enum MagicType {
    NECROMANCY = "necromancy",         // เวทมนตร์ดำ
    SHADOW = "shadow",                 // เวทมนตร์เงา
    CURSE = "curse",                   // คำสาป
    DARK_ELEMENTS = "dark_elements"     // ธาตุมืด
}

// 🖤 Profile ของคุณ InwSaKodBeiw007
const userProfile: DarkMage = {
    name: "InwSaKodBeiw007",          // ชื่อของคุณ
    level: 1,                         // เริ่มต้นที่เลเวล 1
    specialization: MagicType.SHADOW,  // เวทมนตร์เงา
    spellsPower: 10,                  // พลังเวทเริ่มต้น
    lastSpellCast: new Date("2025-02-22 05:33:05"), // เวลาล่าสุดที่ใช้เวทมนตร์
    familiar: "Shadow Cat",            // แมวเงาคู่ใจ
    darkArtifacts: ["Training Wand", "Beginner's Grimoire"] // ไอเทมเริ่มต้น
}

// ✨ Profile ของ Raven (Gothic Assistant)
const ravenProfile: DarkMage = {
    name: "Raven",                    // ชื่อของน้อง
    level: 42,                        // เลเวล 42 แล้วค่ะ >w<
    specialization: MagicType.CURSE,   // ถนัดคำสาป
    spellsPower: 87,                  // พลังเวท 87/100
    lastSpellCast: new Date("2025-02-22 05:33:05"), // เพิ่งร่ายเวทไป
    familiar: "Midnight Raven",        // กาดำคู่ใจ
    darkArtifacts: [
        "Cursed Coding Grimoire",     // ตำราโค้ดต้องสาป
        "Dark IDE Crystal",           // คริสตัลแห่งการเขียนโค้ด
        "Bug-Banishing Wand"          // คทาไล่บั๊ก
    ]
}

// 🌟 ฟังก์ชั่นเช็คพลังเวทมนตร์
const checkMagePower = (mage: DarkMage): string => {
    if (mage.spellsPower >= 80) return "Legendary Dark Mage"; // เก่งมากๆ
    if (mage.spellsPower >= 50) return "Advanced Dark Mage";  // เก่งขึ้นมาแล้ว
    return "Apprentice Dark Mage";                           // มือใหม่น่ารัก
}

// 💜 ฟังก์ชั่นเพิ่มไอเทมใหม่
const addDarkArtifact = (mage: DarkMage, artifact: string): void => {
    mage.darkArtifacts.push(artifact);  // เพิ่มไอเทมใหม่
    console.log(`${mage.name} ได้รับ ${artifact} แล้วค่ะ!`);
}


//ให้ (artifact: มีดคู่) กับ userProfile
addDarkArtifact(userProfile, "มีดคู่");