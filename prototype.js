const parent = {
    value: 'parentValue',
    obj: {
        objValue: 'parentObjValue'
    },
    walk: () => {
        console.log('walking!');
    }
};

const child = Object.create(parent);
console.log('CHILD - child.value: ', child.value);
console.log('CHILD - child.obj.objValue: ', child.obj.objValue);
console.log('PARENT - parent.value: ', parent.value);
console.log('PARENT - parent.obj.objValue: ', parent.obj.objValue);

child.value = 'childValue';
child.obj.objValue = 'childObjValue';
console.log('****CHANGE: child.value = "childValue"');
console.log('CHILD - child.value: ', child.value);
console.log('CHILD - child.obj.objValue: ', child.obj.objValue);
console.log('PARENT - parent.value: ', parent.value);
console.log('PARENT - parent.obj.objValue: ', parent.obj.objValue);
console.log('child.obj === parent.obj ? ', child.obj === parent.obj);

const grandChild = Object.create(child);
console.log('Grandchild: ', grandChild);
grandChild.walk();

// FUNCTION CONSTRUCTORS
function Dog(name) {
    this.name = name;
    console.log("'this' is: ", this);
};

const myDog = new Dog('Max');
console.log('myDog: ', Dog);

Dog('Max2');