import CategoriesItem from './ctgryitem';
export default function CategoriesList(props) {


    return (
        <div>
            <ul>
                {
                    props.categories.map((ele) => {
                        return <CategoriesItem
                            key={ele._id} //default key
                            name={ele.name}
                            id={ele._id}
                            remove={props.remove}
                            add={props.add}
                            edit = {props.edit}

                        />
                    })
                }
            </ul>

        </div>
    )
}