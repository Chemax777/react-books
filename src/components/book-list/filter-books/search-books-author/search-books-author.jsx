import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { filterAuthor } from '../../../../store/bookSlice';

export function SearchBooksAuthor() {
    const dispatch = useDispatch()
    const author = useSelector(state => state.books.filter.author)

    const searchAuthor = (author) => {
        dispatch(filterAuthor(author))
    }

    return (
        <TextField id="author-search" label="Author" variant="standard"
            onChange={(e) => searchAuthor(e.target.value)} 
            value={author}
            />
    );
}

export default SearchBooksAuthor;