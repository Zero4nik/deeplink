'use client'
import { useState } from "react"
import axios from "axios"
import api from "@/lib/api"
import { motion } from "framer-motion"

interface subscribeButtonProps {
    userId: string
    subscribeIsUser: boolean
}

export default function LikedBtn({userId, subscribeIsUser}: subscribeButtonProps){
    const [isFollowing, setIsFollowing] = useState(subscribeIsUser)
    const [loading, setLoading] = useState(false)

    const handleFollow = async () => {
        if(loading) return
        setLoading(true)

        const previousState = isFollowing
        setIsFollowing(!isFollowing)

        try {
            if (previousState) {
                await api.delete(`/users/${userId}/follow`)
            } else {
                await api.post(`/users/${userId}/follow`)
            }
        } catch(err) {
            setIsFollowing(previousState)
            
            if (axios.isAxiosError(err) && err.response?.status !== 401) {
                console.error(' Ошибка подписки:', err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    return(
        <motion.button 
            onClick={handleFollow}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
        >
            {isFollowing ? 'Отписаться' : 'Подписаться'}
        </motion.button>
    )
}