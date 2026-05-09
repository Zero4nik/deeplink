interface Comment {
    content:string
    id:string
    createdAt:string
    Author:{
        id:string
        username:string
    }
}
export default function CommentList({comment}:{comment:Comment[]}){
    return(
        <div>
            <p>Комментарии:{comment.length}</p>
            {comment.length === 0 ? (
                <p>Комментариев пока нету</p>
            ):(
                comment.map((comment) => (
                    <div key={comment.id}>
                        <strong>{comment.Author.username}</strong>
                        <span>{new Date(comment.createdAt).toLocaleDateString('ru-RU')}</span>
                        <p>{comment.content}</p>
                    </div>
                ))
            )}
        </div>
    )
}