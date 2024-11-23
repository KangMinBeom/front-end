function sortTable() {
    const gradeTable = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(gradeTable.rows).slice(0, -1); 

    rows.sort((rowA, rowB) => {
        const 이수명A = rowA.cells[0].firstChild.value;
        const 이수명B = rowB.cells[0].firstChild.value;
        const 필수명A = rowA.cells[1].firstChild.value; 
        const 필수명B = rowB.cells[1].firstChild.value;
        const 과목명A = rowA.cells[2].firstChild.value; 
        const 과목명B = rowB.cells[2].firstChild.value;

        // 이수, 필수, 과목명 순으로 정렬
        return (
            이수명A.localeCompare(이수명B) ||
            필수명A.localeCompare(필수명B) ||
            과목명A.localeCompare(과목명B)
        );
    });

    // 합계 행 위에 정렬된 행 추가
    const totalRow = gradeTable.rows[gradeTable.rows.length - 1]; 
    rows.forEach(row => gradeTable.insertBefore(row, totalRow));
}
