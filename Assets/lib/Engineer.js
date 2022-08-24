const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        console.log(`https://github.com/${this.github}`)
        return `https://github.com/${this.github}`;
    }

    getRole() {
        console.log("Engineer")
        return "Engineer";
    }
}

module.exports = Engineer;