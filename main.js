document.addEventListener('DOMContentLoaded', function () {
    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];

    // 합계 행 추가
    const totalRow = gradeTable.insertRow(); 
    const totalCell = totalRow.insertCell(0);
    totalCell.colSpan = 3;
    totalCell.innerText = "합계";
    for (let i = 1; i <= 8; i++) {
        totalRow.insertCell(i).innerText = 0; 
    }
});
