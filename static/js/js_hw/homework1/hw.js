let name= prompt("Input your name:", "");
let age = +prompt("Input your age:", "");

while (true){

if (name === "" ||  isNaN(Number(age))) {
    alert("WRONG");
    name= prompt("Input your name:", name);
    age = +prompt("Input your age:", age);
}

else {
    if (age < 18){
        alert("You are not allowed to visit this website")
    }
    else if (age <= 22){
        if (confirm(`Are you sure you want to continue?`)){
            alert(`Welcome ${name}`)
        }
        else{
            alert("You are not allowed to visit this website")

        }
    }
    else{
        alert(`Welcome ${name}`)
    }
    break
}
}
