// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const evenNumbers = [];

// for(number of numbers){
//     if(number % 2 === 0){
//         evenNumbers.push(number * 2);
//     }
// }

// console.log(evenNumbers);

const employees = [
{name: "John Doe", salary: 60000, department: "marketing"},
{name: "Alice Cooper", salary: 75000, department: "engineering"},
{name: "Seamus Finnigan", salary: 85000, department: "logistics"}
]

console.log(employees.length);

let total = 0;

for(employee of employees){
    total = total + employee.salary;
}

const average = total / employees.length;
const peopleWithMoreThanAverageSalary = [];

for(employee of employees){
    if(employee.salary > average){
        peopleWithMoreThanAverageSalary.push(employee.name);
    }
}

console.log(peopleWithMoreThanAverageSalary);

const numbers = [1, 2, 3, 4, 5];
let sum = 0;
for(let number of numbers){
    sum = sum + number;
}

console.log(sum);