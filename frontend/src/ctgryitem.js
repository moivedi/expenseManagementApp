import axios from "axios";
export default function CategoriesItem(props) {

    const handleRemove = async () => {
        const confirmation = window.confirm("Are You Sure ?");
        if (confirmation) {
            //es-7
            try {
                const response = await axios.delete(`http://localhost:3050/api/categories/${props.id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                const result = response.data
                props.remove(result._id)
            } catch (err) {
                console.log(err.message);
            }

            //es-6
            // axios.delete(`http://localhost:3050/api/categories/${props.id}`, {
            //     headers: {
            //         Authorization: localStorage.getItem('token')
            //     }
            // })
            //     .then((response) => {
            //         const result = response.data;
            //         props.remove(result._id)
            //     })
            //     .catch((err) => {
            //         console.log(err.message);
            //     })
        }
    }

    const handleEdit = async () => {
        const input = prompt(`Update category name for`)
        if (input.trim())
            try {
                const response = await axios.put(`http://localhost:3050/api/categories/${props.id}`, { name: input }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                const result = response.data;
                props.edit(result);
            } catch (err) {
                console.log(err);
            }
        // axios.put(`http://localhost:3050/api/categories/${props.id}`, { name: input }, {
        //     headers: {
        //         Authorization: localStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         const result = response.data;
        //         props.edit(result);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

    }

    return (
        <div>
            <li>{props.name}</li>
            <button onClick={handleRemove}>Remove</button>
            <button onClick={handleEdit}>Edit</button>

        </div>
    )
}