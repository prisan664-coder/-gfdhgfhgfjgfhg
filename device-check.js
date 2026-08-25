/**
 * ==========================================
 * 📱 Mobile-Only Device Checker
 * ==========================================
 * ป้องกันการใช้งานบน Computer / Desktop
 * อนุญาตให้ใช้งานผ่านมือถือเท่านั้น
 * ==========================================
 */

(function() {
    'use strict';

    // ==========================================
    // 1. ตรวจสอบ Device
    // ==========================================
    function isMobileDevice() {
        // ตรวจสอบ User Agent
        const ua = navigator.userAgent || navigator.vendor || window.opera;

        // รายการคำที่บ่งบอกว่าเป็นมือถือ
        const mobileKeywords = [
            'Android', 'webOS', 'iPhone', 'iPad', 'iPod',
            'BlackBerry', 'Windows Phone', 'Opera Mini',
            'IEMobile', 'Mobile', 'mobile', 'Mobi',
            'Tablet', 'tablet', 'iPad'
        ];

        // ตรวจสอบว่าเป็น Mobile หรือ Tablet
        for (let keyword of mobileKeywords) {
            if (ua.indexOf(keyword) !== -1) {
                return true;
            }
        }

        // ตรวจสอบความกว้างของหน้าจอ (fallback)
        if (window.innerWidth <= 1024 && window.innerHeight <= 768) {
            return true;
        }

        // ตรวจสอบ Touch Event
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            return true;
        }

        return false;
    }

    // ==========================================
    // 2. ตรวจสอบว่าเป็น Desktop หรือไม่
    // ==========================================
    function isDesktopDevice() {
        return !isMobileDevice();
    }

    // ==========================================
    // 3. แสดงหน้าแจ้งเตือน (Block Access)
    // ==========================================
    function showBlockPage() {
        // ลบเนื้อหาทั้งหมดในหน้า
        document.body.innerHTML = '';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.background = '#0f172a';
        document.body.style.minHeight = '100vh';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        // สร้าง Container
        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 420px;
            width: 100%;
            padding: 40px 24px;
            background: #1e293b;
            border-radius: 24px;
            border: 1px solid #334155;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
            margin: 20px;
        `;

        // ไอคอน
        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 4.5rem;
            margin-bottom: 16px;
        `;
        icon.textContent = '📱';

        // หัวข้อ
        const title = document.createElement('h1');
        title.style.cssText = `
            color: #ef4444;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 8px;
        `;
        title.textContent = '🚫 Access Denied';

        // คำอธิบาย
        const desc = document.createElement('p');
        desc.style.cssText = `
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 16px;
        `;
        desc.innerHTML = `
            This application is <strong style="color:#38bdf8;">Mobile Only</strong>.<br>
            Please access using your <strong style="color:#22c55e;">Smartphone</strong>.
        `;

        // ข้อความเพิ่มเติม
        const detail = document.createElement('div');
        detail.style.cssText = `
            background: #121824;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            border: 1px solid #334155;
        `;

        detail.innerHTML = `
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;color:#94a3b8;">
                <span>📌 Your Device:</span>
                <span style="color:#e2e8f0;font-weight:bold;" id="device-name">${getDeviceName()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;color:#94a3b8;">
                <span>📐 Screen Size:</span>
                <span style="color:#e2e8f0;font-weight:bold;">${window.innerWidth} x ${window.innerHeight}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;color:#94a3b8;border-bottom:1px solid #1e293b;padding-bottom:8px;margin-bottom:8px;">
                <span>🖥️ Platform:</span>
                <span style="color:#e2e8f0;font-weight:bold;">${navigator.platform || 'Unknown'}</span>
            </div>
            <div style="text-align:center;color:#475569;font-size:0.75rem;">
                ⚡ Please open this link on your mobile device
            </div>
        `;

        // ปุ่ม Reload
        const btnReload = document.createElement('button');
        btnReload.style.cssText = `
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 12px;
            background: #1877f2;
            color: #fff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
        `;
        btnReload.textContent = '🔄 Try Again';

        btnReload.onmouseover = function() {
            this.style.background = '#1a6ad4';
        };

        btnReload.onmouseout = function() {
            this.style.background = '#1877f2';
        };

        btnReload.onclick = function() {
            window.location.reload();
        };

        // QR Code สำหรับสแกน
        const qrSection = document.createElement('div');
        qrSection.style.cssText = `
            margin-top: 16px;
            padding: 12px;
            background: #121824;
            border-radius: 10px;
            border: 1px solid #334155;
        `;

        const currentUrl = window.location.href;
        qrSection.innerHTML = `
            <div style="text-align:center;margin-bottom:6px;">
                <span style="color:#94a3b8;font-size:0.7rem;">📲 Scan QR to open on mobile</span>
            </div>
            <div style="display:flex;justify-content:center;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}" 
                     alt="QR Code" 
                     style="max-width:120px;width:100%;height:auto;border-radius:8px;border:2px solid #334155;">
            </div>
            <div style="text-align:center;margin-top:4px;">
                <span style="color:#475569;font-size:0.6rem;word-break:break-all;">${currentUrl}</span>
            </div>
        `;

        // ประกอบ Container
        container.appendChild(icon);
        container.appendChild(title);
        container.appendChild(desc);
        container.appendChild(detail);
        container.appendChild(btnReload);
        container.appendChild(qrSection);

        document.body.appendChild(container);

        // ซ่อน滚动
        document.body.style.overflow = 'hidden';
    }

    // ==========================================
    // 4. ดึงชื่อ Device
    // ==========================================
    function getDeviceName() {
        const ua = navigator.userAgent;

        if (ua.indexOf('iPhone') !== -1) return '📱 iPhone';
        if (ua.indexOf('iPad') !== -1) return '📱 iPad';
        if (ua.indexOf('Android') !== -1) {
            if (ua.indexOf('Mobile') !== -1) return '📱 Android Phone';
            return '📱 Android Tablet';
        }
        if (ua.indexOf('Windows Phone') !== -1) return '📱 Windows Phone';
        if (ua.indexOf('BlackBerry') !== -1) return '📱 BlackBerry';
        if (ua.indexOf('Mac') !== -1) return '💻 Mac';
        if (ua.indexOf('Windows') !== -1) return '💻 Windows';
        if (ua.indexOf('Linux') !== -1) return '💻 Linux';
        return '🖥️ Computer';
    }

    // ==========================================
    // 5. ตรวจสอบและดำเนินการ
    // ==========================================
    function checkDevice() {
        // ถ้าเป็น Desktop → แสดงหน้า Block
        if (isDesktopDevice()) {
            showBlockPage();
            console.warn('🚫 Access Blocked: Desktop device detected');
            console.warn('📱 This application is mobile-only');
            return false;
        }

        // ถ้าเป็น Mobile → อนุญาต
        console.log('✅ Mobile device detected - Access granted');
        return true;
    }

    // ==========================================
    // 6. ตรวจสอบขนาดหน้าจอเมื่อเปลี่ยนแปลง
    // ==========================================
    let resizeTimer = null;

    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // ถ้าขยายขนาดหน้าจอมากเกินไป (เหมือน Desktop)
            if (window.innerWidth > 1024 && window.innerHeight > 700) {
                // แต่ถ้าเป็น Mobile แล้วปรับขนาดใหญ่ อาจไม่บล็อค
                // แต่ถ้าเป็น Mobile จริงๆ จะไม่มีทางขยายขนาดได้ขนาดนี้
                // เราจะไม่บล็อคซ้ำเพื่อไม่ให้รำคาญ
            }
        }, 500);
    }

    // ==========================================
    // 7. รันเมื่อ DOM พร้อม
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            checkDevice();
        });
    } else {
        checkDevice();
    }

    // เพิ่ม Event Listener สำหรับ resize
    window.addEventListener('resize', handleResize);

    // ป้องกันการเปิดผ่าน Developer Tools Console
    // (ไม่สมบูรณ์ แต่ช่วยได้บ้าง)
    console.log('%c📱 MiTrade Mobile-Only', 'font-size:20px;font-weight:bold;color:#38bdf8;');
    console.log('%c🚫 Access from desktop is blocked', 'font-size:14px;color:#ef4444;');

    // ==========================================
    // 8. Export (ถ้าใช้ Module)
    // ==========================================
    window.isMobileOnly = {
        isMobile: isMobileDevice,
        isDesktop: isDesktopDevice,
        check: checkDevice,
        getDevice: getDeviceName
    };

})();