import "./post.css"
import {Link} from "react-router-dom"

export default function Post({post}) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
        { post.photho && (
          <img src={PF+post.photho} alt=""></img>
        )}
        <div className="post-info">
            <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
            </Link>
            <hr/>
            <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postdesc">{post.desc}</p>
    </div>
  )
}
