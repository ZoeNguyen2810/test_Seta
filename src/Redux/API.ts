import { FormData } from "../component/addPost/AddPost";

export const getApi = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}


export const postAPI = async (data: FormData) => {
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                body: data.title,
                userId: data.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
                console.log(response);
                return response.json();
            })
            .then(json => console.log(json))
            .catch(error => console.error('Error:', error));
    }
    catch (e) {
        console.log(e);

    }
}