// ตรวจสอบว่าเป็นมือถือหรือไม่
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ให้ทำงานป้องกันเฉพาะบนคอมพิวเตอร์เท่านั้น (ข้ามบนมือถือ)
if (!isMobile) {
    // บล็อกการกดคลิกขวา
    document.addEventListener('contextmenu', event => event.preventDefault());

    // บล็อกปุ่ม F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.onkeydown = function (e) {
        if (e.keyCode == 123) { return false; }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
    };
}