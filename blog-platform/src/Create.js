import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

const Create = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, summary, body};
        setIsPending(true);

        fetch('http://localhost:4000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
            credentials: 'include',
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/');
        })
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];



    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label>Summary:</label>
                <input type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <label>Blog content:</label>
                <ReactQuill
                    className="editor"
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={(newValue) => setBody(newValue)}
                />
                {/* <label>Blog author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="kaveesha">kaveesha</option>
                    <option value="sulakshana">sulakshana</option>
                </select> */}
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}

export default Create;
