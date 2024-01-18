const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Number Array: ', numberArray);

const above5Filter = (value) => {
    return value > 5;
};

const filteredNumberArray = numberArray.filter(above5Filter);
console.log('Filtered Number Array: ', filteredNumberArray);

const shoppingList1 = [
    "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];
console.log('Shopping List: ', shoppingList1);

const searchValue = 'M';
const containsFilter = (value) => {
    return value.indexOf(searchValue) !== -1;
};
const searchShoppingList = shoppingList1.filter(containsFilter);
console.log('Search Shopping List: ', searchShoppingList);