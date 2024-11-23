function validateSubjectNames() {
    const subjectNames = new Set();
    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
    const rows = gradeTable.rows;

    for (let i = 0; i < rows.length - 1; i++) { // 합계 행 제외
        const subjectName = rows[i].cells[2].firstChild.value.trim(); // 과목명 입력란
        if (subjectName) {
            if (subjectNames.has(subjectName)) {
                return false; // 중복일 경우 false 반환
            }
            subjectNames.add(subjectName);
        }
    }

    return true; // 중복이 없으면 true 반환
}

function calculate() {
    // 중복된 과목명 여부 확인
    if (!validateSubjectNames()) {
        alert("중복된 과목명이 있습니다. 확인 후 다시 저장해주세요.");
        return; // 중복된 과목명이 있을 경우 계산 중단
    }

    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
    let totalScore = 0, totalCredits = 0, subjectCount = 0;
    let totalAttendance = 0, totalAssignments = 0, totalMidExam = 0, totalFinalExam = 0;

    for (let i = 0; i < gradeTable.rows.length - 1; i++) { // 합계 행 제외
        const row = gradeTable.rows[i];
        const credits = parseInt(row.cells[3].firstChild.value) || 0;
        const attendance = parseInt(row.cells[4].firstChild.value) || 0;
        const assignment = parseInt(row.cells[5].firstChild.value) || 0;
        const midExam = parseInt(row.cells[6].firstChild.value) || 0;
        const finalExam = parseInt(row.cells[7].firstChild.value) || 0;

        // 점수 유효성 검사
        if (attendance < 0 || attendance > 20 || assignment < 0 || assignment > 20 || midExam < 0 || midExam > 30 || finalExam < 0 || finalExam > 30) {
            alert("점수는 정해진 범위 내에서 입력해야 합니다.");
            return;
        }

        if (credits === 1) {
            row.cells[10].innerText = "P";
            totalCredits += credits; 
            continue;
        }

        const total = attendance + assignment + midExam + finalExam;
        totalScore += total;
        totalCredits += credits;
        totalAttendance += attendance;
        totalAssignments += assignment;
        totalMidExam += midExam;
        totalFinalExam += finalExam;
        subjectCount++;

        // 학점 계산
        let grade = '';
        if (total >= 90) grade = 'A+';
        else if (total >= 80) grade = 'B0';
        else if (total >= 70) grade = 'C0';
        else if (total >= 60) grade = 'D+';
        else grade = 'F';

        row.cells[8].innerText = total; // 총점
        row.cells[10].innerText = grade; // 성적
    }

    // 합계 행 업데이트
    const totalRow = gradeTable.rows[gradeTable.rows.length - 1]; // 합계 행
    const average = subjectCount > 0 ? totalScore / subjectCount : 0; // 평균 계산
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

    totalRow.cells[8].innerText = averageGrade; // 평균 성적 업데이트

    // 점수 계산 후 정렬 호출
    sortTable(); // 정렬 호출
}
