/* eslint-disable react-hooks/set-state-in-effect */

'use client'

import api from "@/lib/api"
import { useState, useEffect } from "react"
import PostCard from "@/components/postCard"
import CreatePostForm from "@/components/createPost"
import { motion, AnimatePresence } from "framer-motion"
interface Post {
    id:string
    createdAt:string
    content:string
    Author: {
        id:string
        username:string
    }
    likeCount:number
    isLiked:boolean

}

export default function Home() {
    const [post,setPost] = useState<Post[]>([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')

       const fetchAllPost = async () => {
        try{
            const response = await api.get('/posts/all')
            setPost(response.data.posts || []);
        }catch(error){
            setError('Не удалось загрузить посты')
        }finally{
            setLoading(false)
        }
    }
useEffect(() => {
    
    fetchAllPost()
},[])

if(loading) return <p>Загрузка...</p>
if(error) return <p style={{color:'red'}}>{error}</p>
return(
        <div>
            <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                Лента
            </motion.p>
            <CreatePostForm onPostCreated={fetchAllPost} />
            <AnimatePresence>
                {post.length === 0 ? (
                    <p>Постов пока нету</p>
                ) : (
                    post.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PostCard post={p} />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    )
}