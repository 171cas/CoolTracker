
const MessageDetail = ({ message }) => {

    return (
        <>
            <div className='messageLine' key={message?.id}>
                <p>
                    {message?.message}
                </p>
            </div>
        </>
    )
}

export default MessageDetail;
