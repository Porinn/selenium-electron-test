// controller.js와 통신하는 Node 서버단 (Backend)
const {Builder, By} = require('selenium-webdriver');
const sleep = require('util').promisify(setTimeout);

// index의 ipcMain에서 연계
exports.run = (event) => {
    // WebDriver 선언
    driver = new Builder().forBrowser('chrome').build();
    run(driver, event);
}

// 전체 테스트케이스 실행
async function run(driver, event) {
    let result = await login(driver, event);
    if (result) result = await logout(driver, event);
    driver.quit();
}

// 로그인 테스트케이스
async function login(driver, event) {
    // 모든 테스트케이스는 시간 지연 후 시작
    await sleep(3000);

    try {
        // 시나리오 실행
        await driver.get('http://localhost');
        await driver.findElement(By.xpath('//input[@id="userId"]')).sendKeys('admin');
        await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('admin');
        await driver.findElement(By.xpath('//*[@id="loginForm"]/fieldset/div[2]/button')).click();
        
        // 정상 결과가 나왔는지(로그인 완료) 특정 Element를 찾는 것으로 확인
        await driver.findElement(By.xpath('//*[@id="Sidebar"]'));

        // 결과 전송
        event.sender.send('run-receive', {name: '로그인', result: true});
        return true;        
    } catch (exception) {
        // 실패 결과 전송
        event.sender.send('run-receive', {name: '로그인', result: false});
        return false;
    }
}

// 로그아웃 테스트케이스
async function logout(driver, event) {
    // 모든 테스트케이스는 시간 지연 후 시작
    await sleep(3000);

    try {
        // 시나리오 실행
        await driver.findElement(By.xpath('//*[@id="userInfoBlock"]/a/span/small')).click();
        await driver.findElement(By.xpath('//*[@id="userInfoBlock"]/ul/li[4]/a')).click();
        
        // 정상 결과가 나왔는지(로그아웃 후 로그인 화면으로 이동) 특정 Element를 찾는 것으로 확인
        await driver.findElement(By.xpath('//input[@id="userId"]'));

        // 결과 전송
        event.sender.send('run-receive', {name: '로그아웃', result: true});
        return true;        
    } catch (exception) {
        // 실패 결과 전송
        event.sender.send('run-receive', {name: '로그아웃', result: false});
        return false;
    }
}