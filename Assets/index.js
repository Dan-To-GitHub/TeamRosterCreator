const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const team = [];
const cards = ""

const generateHtml = (add) =>
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>
    <main>
        ${add}
    </main>
</body>
</html>`;

module.exports = {generateHtml};

// Manager prompt
function managerInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            }, {
                type: "input",
                name: "id",
                message: "What is your employee ID?"
            }, {
                type: "input",
                name: "email",
                message: "What is your email address?"
            }, {
                type: "input",
                name: "officeNumber",
                message: "What is your office number?"
            }
        ])
        .then((data) => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            team.push(manager);
            init();
        });
}

// Engineer prompt
function engineerInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            }, {
                type: "input",
                name: "id",
                message: "What is your employee ID?"
            }, {
                type: "input",
                name: "email",
                message: "What is your email address?"
            }, {
                type: "input",
                name: "github",
                message: "What is your GitHub username?"
            }
        ])
        .then((data) => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            team.push(engineer);
            init();
        });
}

// Intern prompt
function internInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            }, {
                type: "input",
                name: "id",
                message: "What is your employee ID?"
            }, {
                type: "input",
                name: "email",
                message: "What is your email address?"
            }, {
                type: "input",
                name: "school",
                message: "What is your school?"
            }
        ])
        .then((data) => {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            team.push(intern);
            init();
        });
}

function init() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Which type of employee would you like to add?",
                choices: ["engineer", "intern", "finish enrolling"]
            }
        ])
        .then((data) => {
            switch(data.role) {
                case "engineer":
                    engineerInfo();
                    break;
                case "intern":
                    internInfo();
                    break;
                case "finish enrolling":
                    default:
                        finishEnrolling();
                        break;
            }
        });
}

function finishEnrolling() {
    for (i in team) {
        switch(team[i].getRole()) {
            case "Manager":
                const addManager = (team[i].name, team[i].id, team[i].email, team[i].officeNumber) =>
                `<section class="card">
                    <section class="name">
                        <h1>${team[i].name}</h1>
                        <h2>${team[i].getRole()}</h2>
                    </section>
                    <section>
                        <section>ID: ${team[i].id}</section>
                        <section>Email: ${team[i].email}</section>
                        <section>Office Number: ${team[i].officeNumber}</section>
                    </section>
                </section>`;
                cards += addManager;
                break;
            case "Engineer":
                let addEngineer = (team[i].name, team[i].id, team[i].email, team[i].github) =>
                `<section class="card">
                    <section class="name">
                        <h1>${team[i].name}</h1>
                        <h2>${team[i].getRole()}</h2>
                    </section>
                    <section>
                        <section>ID: ${team[i].id}</section>
                        <section>Email: ${team[i].email}</section>
                        <section>GitHub: ${team[i].github}</section>
                    </section>
                </section>`;
                cards += addEngineer;
                break;
            case "Intern":
                let addIntern = (team[i].name, team[i].id, team[i].email, team[i].school) =>
                `<section class="card">
                    <section class="name">
                        <h1>${team[i].name}</h1>
                        <h2>${team[i].getRole()}</h2>
                    </section>
                    <section>
                        <section>ID: ${team[i].id}</section>
                        <section>Email: ${team[i].email}</section>
                        <section>School: ${team[i].school}</section>
                    </section>
                </section>`;
                cards += addIntern;
                break;
        };         
    };
    const fullHtml = generateHtml(cards);

    fs.writeFile("./dist/team.html", fullHtml, (err) =>
    err ? console.log(err) : console.log("Success!"));
}

managerInfo();

        
       

