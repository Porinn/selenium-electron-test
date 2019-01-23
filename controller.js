// HTML 화면에 붙는 Javascript (Frontend)
const {ipcRenderer} = require('electron');

// 실행 버튼 클릭 시 동작
const clickButton = () => {
    // node에 run 이벤트 전송
    ipcRenderer.send('run');
}

// 초기화 버튼 클릭 시 동작
const clearResult = () => {
    console.log('clear');
    document.getElementById('result-area-tbody').innerHTML = '';
}

// node에서 각 테스트케이스별 실행 결과를 보내면 동작
ipcRenderer.on('run-receive', (event, result) => {
    const html = document.getElementById('result-area-tbody').innerHTML;
    if (result.name) {
        document.getElementById('result-area-tbody').innerHTML = `${html}<tr><td>${result.name}</td><td>${result.result ? 'O' : 'X'}</td></tr>`;
    } else {
        document.getElementById('result-area-tbody').innerHTML = `${html}<tr><td>${result}</td></tr>`;
    }    
})