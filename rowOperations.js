function addRow() {
    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
    const newRow = gradeTable.insertRow(gradeTable.rows.length - 1);
    const cells = [];

    const 이수 = document.createElement('select');
    const 이수1 = document.createElement('option');
    이수1.value = "교양";
    이수1.text = "교양";
    const 이수2 = document.createElement('option');
    이수2.value = "전공";
    이수2.text = "전공";
    이수.appendChild(이수1);
    이수.appendChild(이수2);
    cells[0] = newRow.insertCell(0);
    cells[0].appendChild(이수);

    const 필수 = document.createElement('select');
    const 필수1 = document.createElement('option');
    필수1.value = "필수";
    필수1.text = "필수";
    const 필수2 = document.createElement('option');
    필수2.value = "선택";
    필수2.text = "선택";
    필수.appendChild(필수1);
    필수.appendChild(필수2);
    cells[1] = newRow.insertCell(1);
    cells[1].appendChild(필수);

    // 나머지 셀에 input box 추가
    for (let i = 2; i < 11; i++) {
        cells[i] = newRow.insertCell(i);
        if (i < 8) { 
            const input = document.createElement('input');
            input.type = "text";
            cells[i].appendChild(input);
        }
    }

    // 체크박스 추가
    const checkboxCell = newRow.insertCell(11); 
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkboxCell.appendChild(checkbox);
}
function deleteRow() {
    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(gradeTable.getElementsByTagName('tr')); 
    let totalScore = 0, totalCredits = 0, subjectCount = 0;
    let totalAttendance = 0, totalAssignments = 0, totalMidExam = 0, totalFinalExam = 0;

    for (let i = rows.length - 1; i >= 0; i--) {
        const checkbox = rows[i].querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            gradeTable.deleteRow(i); 
        }
    }

    // 삭제 후 합계 행 업데이트
    const remainingRows = gradeTable.rows;
    for (let i = 0; i < remainingRows.length - 1; i++) { 
        const row = remainingRows[i];
        const credits = parseInt(row.cells[3].firstChild.value) || 0;
        const attendance = parseInt(row.cells[4].firstChild.value) || 0;
        const assignment = parseInt(row.cells[5].firstChild.value) || 0;
        const midExam = parseInt(row.cells[6].firstChild.value) || 0;
        const finalExam = parseInt(row.cells[7].firstChild.value) || 0;

        // 합계 값 재계산
        totalScore += attendance + assignment + midExam + finalExam;
        totalCredits += credits;
        totalAttendance += attendance;
        totalAssignments += assignment;
        totalMidExam += midExam;
        totalFinalExam += finalExam;
        subjectCount++;
    }

    // 합계 행 업데이트
    const totalRow = remainingRows[remainingRows.length - 1];
    const average = subjectCount > 0 ? totalScore / subjectCount : 0; 
    totalRow.cells[1].innerText = totalCredits;
    totalRow.cells[2].innerText = totalAttendance;
    totalRow.cells[3].innerText = totalAssignments;
    totalRow.cells[4].innerText = totalMidExam;
    totalRow.cells[5].innerText = totalFinalExam;
    totalRow.cells[6].innerText = totalScore;
    totalRow.cells[7].innerText = average;

    let averageGrade = '';
    if (average >= 90) averageGrade = 'A+';
    else if (average >= 80) averageGrade = 'B0';
    else if (average >= 70) averageGrade = 'C0';
    else if (average >= 60) averageGrade = 'D+';
    else averageGrade = 'F';

    totalRow.cells[8].innerText = averageGrade; 
}
