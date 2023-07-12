const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		refreshToken: { type: String, required: true },
	},
	{
		timestamp: true,
	}
)

module.exports = model('Token', schema)
