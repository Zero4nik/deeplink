'use client'
import { useState, FormEvent } from "react"
import api from "@/lib/api"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreatePostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/posts', { content })
            setContent('')
            onPostCreated()
            router.push('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.response?.data?.error;
                setError(typeof message === 'string' ? message : 'Ошибка при создании поста');
            } else {
                setError('Ошибка соединения с сервером');
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="О чем думаете"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3} />
            <button type="submit" disabled={loading || !content.trim()}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {loading ? 'Публикуем...' : 'Публиковать'}
            </button>
        </form>
    )
}