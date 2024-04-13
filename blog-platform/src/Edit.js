import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

const Edit = () => {

    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:4000/blogs/'+ id)
        .then(res => {
            res.json().then(postInfo => {
                setTitle(postInfo.title);
                setBody(postInfo.body);
                setSummary(postInfo.summary);
            })
        })
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const blog = {id,title, summary, body};
        setIsPending(true);

        fetch('http://localhost:4000/blogs', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
            credentials: 'include',
        }).then(() => {
            console.log('blog updated');
            setIsPending(false);
            history.push('/blogs/' + id);
        }).catch(err => {
            console.log(err);
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
            <h2>Edit the Blog</h2>
            <form onSubmit={handleUpdate}>
                <label>Blog title:</label>
                <input type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label>Summary</label>
                <input type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <label>Blog body:</label>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={(newValue) => setBody(newValue)}
                />
                {!isPending && <button>Update Blog</button>}
                {isPending && <button disabled>Updating Blog</button>}
            </form>
        </div>
    ); 
}
 
export default Edit;