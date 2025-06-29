document.addEventListener('DOMContentLoaded', () => {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const userInfo = document.getElementById('userInfo');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // 로그인 상태 확인 및 UI 업데이트
    if (jwt && username) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userInfo.style.alignItems = 'center';
        userInfo.style.gap = '10px';
        document.getElementById('usernameDisplay').textContent = username;
        syncThemeWithServer(username, jwt);

        // 다크 모드 설정 적용
        applyDarkMode(username, jwt);
    }

    // 로그인 버튼 클릭
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // 로그아웃 버튼 클릭
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            alert('로그아웃 성공');
            window.location.href = 'index.html';
        });
    }

    // 설정 버튼 클릭
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }
});

// 다크 모드 적용 함수
async function applyDarkMode(username, jwt) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/demo/darkmode/${username}`, {
            headers: { 'jwt': jwt }
        });
        const data = await response.json();

        if (data.darkmode === true) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    } catch (error) {
        console.error('Dark mode error:', error);
    }
}

// 다크 모드 적용 함수 (모든 페이지에서 사용)
function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// localStorage에서 테마 상태 가져오기
function getThemeState() {
    const theme = localStorage.getItem('darkmode');
    return theme === 'true';
}

// 페이지 로드 시 테마 적용
function initTheme() {
    const isDark = getThemeState();
    applyTheme(isDark);
    return isDark;
}

// 서버에서 테마 설정 동기화
async function syncThemeWithServer(username, jwt) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/demo/darkmode/${username}`, {
            headers: { 'jwt': jwt }
        });
        const data = await response.json();
        const isDark = data.darkmode === true || data.darkmode === 'true';
        localStorage.setItem('darkmode', isDark);
        applyTheme(isDark);
    } catch (error) {
        console.error('Theme sync error:', error);
    }
}