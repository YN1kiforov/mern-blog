export type TagType = {
	value: string,
	label: string,
	color: string
}
export type UserType = {
	_id: string,
	name: string,
	email: string,
	password: string,
	about: string,
	subscribersList: string[],
	notificationsList: string[],
	avatarUrl: string,
	createdAt: string,
}
export type PostType = {
	_id: string,
	title: string,
	author: UserType,
	body: string,
	imageUrl: string,
	viewsCount: number,
	number: number,
	commentsCount: number,
	tags: string[],
	createdAt: string,
}
export type CommentType = {
	_id: string,
	author: UserType,
	body: string,
	postId: string,
	createdAt: string,
}
