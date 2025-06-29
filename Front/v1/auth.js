document.addEventListener('DOMContentLoaded', () => {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const userInfo = document.getElementById('userInfo');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // 테마 상태 적용
    const theme = localStorage.getItem('darkmode');
    if (theme === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    // 로그인 상태 확인 및 UI 업데이트
    if (jwt && username) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            userInfo.style.alignItems = 'center';
            userInfo.style.gap = '10px';
        }
        if (document.getElementById('usernameDisplay')) {
            document.getElementById('usernameDisplay').textContent = username;
        }
        // 서버에서 다크모드 동기화
        syncThemeWithServer(username, jwt);
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            localStorage.removeItem('darkmode');
            alert('로그아웃 성공');
            window.location.href = 'index.html';
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }
});

// 서버에서 다크모드 상태 동기화
async function syncThemeWithServer(username, jwt) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/demo/darkmode/${username}`, {
            headers: { 'jwt': jwt }
        });
        const data = await response.json();
        const isDark = data === true || data === "true";
        localStorage.setItem('darkmode', isDark);
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    } catch (error) {
        console.error('Dark mode error:', error);
    }
}
