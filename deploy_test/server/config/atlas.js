const runDB = () => {
	const { MongoClient, ServerApiVersion } = require("mongodb");
	const uri = process.env.DATABASE_URL;

	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});
	async function run() {
		try {
			const database = client.db("insertDB");
			const haiku = database.collection("haiku");
			// create a document to insert
			const doc = {
				title: "Record of a Shriveled Datum",
				content: "No bytes, no problem. Just insert a document, in MongoDB",
			};
			const result = await haiku.insertOne(doc);
			console.log(`A document was inserted with the _id: ${result.insertedId}`);
		} finally {
			await client.close();
		}
	}
	run().catch(console.dir);
};

module.exports = { runDB };
