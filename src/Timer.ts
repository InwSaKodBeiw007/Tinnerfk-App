const startBreakTimer = (minutes: number) => {
    console.log('🦇 Your spooky break timer starts now ~'); // แสดงข้อความเริ่มต้น

    const endTime = new Date().getTime() + minutes * 60 * 1000; // คำนวณเวลาสิ้นสุด

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

        console.clear();
        console.log(`
      🌙 Gothic Break Timer 🦇
      ━━━━━━━━━━━━━━━━━━━
      Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}
      ━━━━━━━━━━━━━━━━━━━
      `); // แสดงเวลาที่เหลือแบบน่ารักๆ

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            console.log('🕸️ Time to return to your dark coding chamber ~'); // แจ้งเตือนหมดเวลา
        }
    }, 1000);
};

// Usage example:
startBreakTimer(60); // Set timer for 60 minutes