import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { formatISO9075 } from "date-fns";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`http://localhost:4000/blogs/${id}`);
    const history = useHistory();
    const { userInfo } = useContext(UserContext);

    const handleClick = () => {
        fetch('http://localhost:4000/blogs/' + blog.id, {
            method: "DELETE"
        })
            .then(() => {
                history.push('/');
            });
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h1>{blog.title}</h1>
                    <time>{formatISO9075(new Date(blog.createdAt))}</time>
                    <p className="author">written by {blog.author.username}</p>
                    {userInfo.id === blog.author._id && (
                        <div className="edit-row">
                            <Link to={`/edit/${blog._id}`} className="edit-btn">
                                Edit this post
                            </Link>
                        </div>
                    )}
                    <div className="body" dangerouslySetInnerHTML={{ __html: blog.body }} />
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails; 