import "./Posts.scss"
import Post from "../../components/Post/Post"

import Loader from "../../components/Loader/Loader";
import * as React from 'react';
import { usePosts } from "../../hooks/usePosts";
const Posts = () => {
	const { posts, isLoading } = usePosts()
	return (
		<>
			{isLoading
				? <Loader />
				: <div className="posts">
					<ul className="posts__list">
						{posts
							? posts.length
								? posts.map((post, index) => {
									return <li key={`${post.title}_${index}`}>
										<Post
											title={post.title}
											viewsCount={post.viewsCount}
											commentsCount={post.commentsCount}
											author={post.author}
											body={post.body}
											link={post._id}
											date={post.createdAt}
											imageUrl={post.imageUrl}
											className="home__post">
										</Post>
									</li>
								})
								: <div className='posts__helper'> Нет постов такой категории. Станьте первым :) </div>
							: <div className='posts__helper'>Не удалось найти посты :(</div>}
					</ul>
				</div>}
		</>

	);
}
export default Posts;
