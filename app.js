const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

// function to create new manager
async function createManager() {
    const questions = [
        {
            type: "input",
            message: "What is the Manager's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Manager's Email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Manager's office Number?",
            name: "officeNumber"
        },
    ]

    const { name, id, email, officeNumber } = await inquirer.prompt(questions);

    const manager = new Manager(name, id, email, officeNumber);
    employees.push(manager);
    selectEmployeeType();
}


// function to create new engineer
async function createEngineer() {
    const questions = [
        {
            type: "input",
            message: "What is the Engineer's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Engineer's Email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github"
        },
    ]

    const { name, id, email, github } = await inquirer.prompt(questions);

    const engineer = new Engineer(name, id, email, github);
    employees.push(engineer);
    selectEmployeeType();
}

// function to create new intern
async function createIntern() {
    const questions = [
        {
            type: "input",
            message: "What is the Intern's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Intern's Email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Intern's School?",
            name: "school"
        },
    ]

    const { name, id, email, school } = await inquirer.prompt(questions);

    const intern = new Intern(name, id, email, school);
    employees.push(intern);
    
    selectEmployeeType();
}


// funtion to select type of employee for creating or quit program
async function selectEmployeeType() {
    const question = [
        {
            type: "list",
            message: "What type of employee would you like to add?",
            choices: ["Intern", "Engineer", "I don't want to add any more employees."],
            name: "empType"
        }
    ]

    let { empType } = await inquirer.prompt(question);

    if (empType === "Engineer") {
         createEngineer();
    } else if (empType === "Intern") {
         createIntern();
    } else {
        console.log("Success!! Team has been built");

        createOutput();

        return;
    }
}

// function to create output file
function createOutput() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile(outputPath, render(employees), err => {if (err) throw err} );
}

async function buildTeam() {
    await createManager();
} 

buildTeam();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```