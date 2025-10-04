const employee = {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Project Manager",
    salary: 60000,
    currentProjects: ["FaceBookForCats", "AmazonButBetter", "NotFlix", "InstaGran"],
    author: {
        firstName : "John",
        lastName: "Doe"
    },
    pages: 300
};

console.log(employee.author.firstName);

console.log(Object.keys(employee));