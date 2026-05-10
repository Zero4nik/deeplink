'use client'
import { useState } from "react"
import axios from "axios"
import api from "@/lib/api"
import { motion } from "framer-motion"

interface likedButtonProps {
    postId:string
    postIsLiked:boolean
    LikedIsCount:number
}

export default function LikedBtn({postId, postIsLiked, LikedIsCount}: likedButtonProps){
    const [isLiked, setIsLiked] = useState(postIsLiked)
    const [isLikedCount, setIsLikedCount] = useState(LikedIsCount)
    const [loading, setLoading] = useState(false)

    const handleLike = async () => {
        if(loading) return
        setLoading(true)


        const previousLiked = isLiked
        const previousCount = isLikedCount

        setIsLiked(!isLiked)
        setIsLikedCount(isLiked ? previousCount - 1 : previousCount + 1)
        
        try {
            if (previousLiked) {
                await api.delete(`/posts/${postId}/like`)
            } else {
                await api.post(`/posts/${postId}/like`)
            }
        } catch(err) {

            setIsLiked(previousLiked)
            setIsLikedCount(previousCount)
            
            if (axios.isAxiosError(err) && err.response?.status !== 401) {
                console.error('Ошибка лайка:', err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    return(
        <motion.button 
            onClick={handleLike}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            {isLiked ? '❤️' : '🤍'} {isLikedCount}
        </motion.button>
    )
}