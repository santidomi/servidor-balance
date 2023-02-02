export function getNumbers(quantity) {
	//create an empty array to store the generated numbers
	let numbers = [];
	//create an empty object to store the number of times each number is repeated
	let count = {};
	for (let i = 0; i < quantity; i++) {
		let randomNumber = Math.floor(Math.random() * 1000);
		//increment the count for the current number
		count[randomNumber] = (count[randomNumber] || 0) + 1;
		numbers.push(randomNumber);
	}
	return count;
}
