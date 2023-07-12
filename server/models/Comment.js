const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		content: { type: String, required: true },
		// На чьей стр комментарий
		pageId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		// Кто оставил комменатрий
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamp: { createdAt: 'created_at' },
	}
)

module.exports = model('Comment', schema)
