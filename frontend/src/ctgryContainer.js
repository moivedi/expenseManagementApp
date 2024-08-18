import CategoryForm from "./ctgryForm";
import CategoriesList from "./ctgryList";



function CategoriesContainer(props) {

    return (
        <div>
            <h1>Listing categories- {props.categories.length}</h1>
            <CategoriesList
            categories={props.categories} 
            remove = {props.removeCategory}
            addCategory = {props.addCategory}
            edit = {props.edit}
            />


            <CategoryForm addCategory={props.addCategory} />
        </div>
    )
}

export default CategoriesContainer;