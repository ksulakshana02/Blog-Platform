import { Link } from "react-router-dom/cjs/react-router-dom";
import { format } from "date-fns";

const BlogList = (props) => {

    const blogs = props.blogs;
    const title = props.title;
    // const handleDelete = props.handleDelete;

    return (
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>
                        <div className="author-time">
                            <p className="author">{blog.author.username} •</p>
                            <time>{format(new Date(blog.createdAt), 'MMM d, yyyy HH:mm')}</time>
                        </div>
                        <h1>{blog.title}</h1>
                        <p className="summary">{blog.summary}</p>
                    </Link>
                    {/* <button onClick={()=> {handleDelete(blog.id)}}>Delete blog</button> */}
                </div>
            ))}
        </div>
    );
}

export default BlogList;