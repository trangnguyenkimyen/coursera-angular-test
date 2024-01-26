function Person() {
    this.fullName = 'Yaakov';
    this.fav = 'Cookies';

    this.describe = function () {
        console.log(`this is: `, this);
        console.log(`${this.fullName} likes ${this.fav}`);
    };
};

const yaakov = new Person();
yaakov.describe();

const describe = yaakov.describe;
describe();
describe.call(yaakov);