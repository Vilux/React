const GradeService={
calcGrade(asgnItems){
    let tempAsgnItems = asgnItems
    let grade = 0
    for(var i=0; i < tempAsgnItems.length; i++){
        var numberOfAssignments = i + 1;
        grade = grade + parseFloat(tempAsgnItems[i].grade)
        }
    grade = grade / numberOfAssignments
    
    return grade;
}
};

export default GradeService;