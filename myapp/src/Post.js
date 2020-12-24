import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase'
import firebase from 'firebase'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Button } from '@material-ui/core'
function Post({postId,user, username, caption, imageUrl }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState([])
    const [like, setLike] = useState(0)

    useEffect(()=> {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("likes")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setLikes(snapshot.docs.map((doc) => doc.data()))
            })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault()
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')

    }

    const postlike = (event) => {
        event.preventDefault()
        
        db.collection("posts").doc(postId).collection("likes").add({
            like: like,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            
        })
        
        .catch((error) =>alert(error.message))
        setLike(like+1)
        
    }

    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar"
            alt="ShreedharPatil"
            src="">
            </Avatar>
            <h3>{username}</h3>
            </div>
            {/* header -> avatar + username */}
            <img 
            className="post__image"
            src={imageUrl}          
            alt=""
            >
            </img>
            <div className="post__likeicons">
            <FavoriteBorderOutlinedIcon className="post__like" onClick={postlike}  onChange={(e) => like(e.target.value)} ></FavoriteBorderOutlinedIcon>
            <ChatBubbleOutlineRoundedIcon className="post__like"></ChatBubbleOutlineRoundedIcon>
            <TelegramIcon className="post__like"></TelegramIcon>
            </div>
            <div className="post__likecounter">
            <h5 className="post__peoplelike">Liked by</h5><span><h5>{like} others people</h5></span>
            </div>
           
            {/* image */}
            <h4 className="post__text"><strong>{username} :</strong>{caption}</h4>
            {/* username + caption */}

            
                <div className="post__comments">
                    {comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong>{comment.text}
                        </p>
                    ))}
                </div>
           


            {user && (
                 <form className="post__commentBox">
                 <input
                 className = "post__input"
                 type="text"
                 placeholder="Add a Comment..."
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 ></input>
                 <button
                 className="post__button"
                 disabled={!comment}
                 type="submit"
                 onClick={postComment}
                 ><strong>Post</strong></button>
             </form>
            )}
           
        </div>
       
        
    )
}

export default Post
