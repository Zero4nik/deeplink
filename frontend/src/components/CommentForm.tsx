'use client'

import { useState,FormEvent } from "react"
import api from "@/lib/api"
import axios from "axios"

export default function CommentForm({postId,addComments}:{postId:string,addComments:() => void}){
    const [content,setContent] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if(!content.trim()) return
        setLoading(true)
        setError('')

        try{
            await api.post(`/posts/${postId}/comments`,{content})
            setContent('')
            addComments()
        }catch(error){
            if(axios.isAxiosError(error)){
        setError(error.response?.data || 'Ошибка создания комментария')
            }else{
                setError('Ошибка сервера')
            }
        }finally{
            setLoading(false)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Написать комментарий"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)} />
            <button type="submit" disabled={loading || !content.trim()}>
                {content ? 'Отправка' : 'Отправить'}
            </button>
        </form>
    )
}