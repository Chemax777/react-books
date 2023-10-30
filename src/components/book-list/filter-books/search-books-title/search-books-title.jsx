import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterTitle } from "../../../../store/bookSlice";

function SearchBooksTitle() {
    const dispatch = useDispatch()
    const title = useSelector(state => state.books.filter.title)

    const searchTitle = (title) => {
        dispatch(filterTitle(title))
    }

    return (
        <TextField id="title-search" label="Title" variant="standard"
            onChange={(e) => { searchTitle(e.target.value) }}
            value={title}
        />
    );
}

export default SearchBooksTitle;