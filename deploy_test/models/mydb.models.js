const { database, users } = require("../config/atlas");

const _readDb = async (query) => {
	const result = await users.findOne(query);
	console.log(`A user was found with the _id: ${result._id}`);
	return result;
};
const _insertUser = async (user) => {
	const result = await users.insertOne(user);
	console.log(`A user was inserted with the _id: ${result.insertedId}`);
	return result;
};

module.exports = { _readDb, _insertUser };
