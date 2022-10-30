import { useState, useEffect } from "react"
import axios from "../axios"
import { useSearchParams, useLocation, } from "react-router-dom";
import { PostType } from "../types";
export const usePosts = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation()
	const [posts, setPosts] = useState<PostType[] | null>(null);
	const [lastPostNumber, setLastPostNumber] = useState<string | null>(null);
	const [category, setCategory] = useState<string | null>(null);
	const [fetching, setFetching] = useState<boolean>(true);
	const [stopFetching, setStopFetching] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const limit = 8;

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []);

	useEffect(() => {
		let isNewCategory = category !== searchParams.get("category");
		try {
			if ((fetching && !stopFetching) || isNewCategory) {
				(async () => {
					isNewCategory && setIsLoading(true)
					let { data } = await axios.get(`/getAll?limit=${limit}				
					&category=${searchParams.get("category")}
					&search=${searchParams.get("search")}
					&lastPostNumber=${isNewCategory ? null : lastPostNumber}`)
					if (isNewCategory) {
						setStopFetching(false)
						setPosts(data.posts)
						setCategory(searchParams.get("category"))
						setIsLoading(false)
					} else {
						setPosts((prev) => (prev ? prev.concat(data.posts) : data.posts))
					}
					if (data.posts.length < limit) {
						return setStopFetching(true)
					}
					setLastPostNumber(data.posts[data.posts.length - 1].number)
					setFetching(false)
					setIsLoading(false)
				})()
			}
		} catch (error) {
			console.log(error)
		}
	}, [fetching, location, searchParams, lastPostNumber, stopFetching, category]);
	const scrollHandler = (e: any) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) {
			setFetching(true)
		}
	}
	return { posts, isLoading };
}
