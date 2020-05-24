let student = {
    'name': null,
    'last name': null
};

// ask name until correct inserted
function get_correct_name(text) {
    while (true){
        let name = prompt(text, '');
        if (name) {return name}
        else {alert('WRONG')}


}}

function tabel_fill(tabel){
    while (true){
        let new_line = prompt('Insert 1 subject and mark to tabel in the following format:\n   subject,mark\nDuplicated subjects will be overwritten.', '');
        if(!new_line){break}
        let [subject, mark] = new_line.split(',');
        if (!isNaN(+subject) || isNaN(+mark)){
            alert("Wrong format")
        }
        else{
            tabel[String.to] = +mark;
        }
    }
}
// name
student['name'] = get_correct_name('insert student first name ');
student['last name'] = get_correct_name('insert student last name');
student['tabel'] = {};

//marks insert
tabel_fill(student.tabel);

//report fill
result = '';
result += `Name - ${student['name']}\n`;
result += `Last name - ${student['last name']}\n`;
result += `\nMarks:\n`;
for (let subj in student.tabel){
    result += `---${subj} - ${student.tabel[subj]}\n`
}


let marks =  Object.values(student.tabel);

// empty if marks <4 not in the array
let bad_marks = marks.filter((x) => x < 4);
console.log(bad_marks.length);
if (bad_marks.length === 0){
    result += '\nStudent transferred to the next course\n';
}

let avg_rating =  marks.reduce((x, y) => x + y) / marks.length;
(avg_rating > 7) ?  result += '\nStudent got a grant\n' : 0;
alert(result);

