class Restaurant {
    constructor(config) {
        this.name = config.name;
        this.cash = config.cash;
        this.seats = config.seats;
        this.staff = config.staff;
        this.wtForCook = [];
    }

    hire(employee) {
        let len = this.staff.push(employee);
        employee.id = 1000 + len;
    }

    fire(employee) {
        for (let i = 0; i < this.staff.length; i++) {
            if (this.staff[i] === employee) {
                this.staff.splice(i, 1);
                return;
            }
        }
        console.log('职员' + employee.name + '不在职员列表中');
    }
}