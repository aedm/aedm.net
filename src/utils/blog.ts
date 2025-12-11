// Helper function to extract slug from folder name
// Pattern: YYYY-MM-DD-slug -> slug
export function getSlugFromId(id: string): string {
	// Remove /index suffix if present
	const cleanId = id.replace(/\/index$/, '');
	// Extract the slug part after the date prefix
	const match = cleanId.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
	return match ? match[1] : cleanId;
}

