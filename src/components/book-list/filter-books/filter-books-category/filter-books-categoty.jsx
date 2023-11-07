import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { filterCategory } from "../../../../store/bookSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

const categories = [
    { value: '', text: 'all' },
    { value: 'cooking', text: 'cooking' },
    { value: 'fiction', text: 'fiction' },
    { value: 'crime', text: 'crime' },
    { value: 'sociology', text: 'sociology' },
    { value: 'poetry', text: 'poetry' },
    { value: 'education', text: 'education' },
]

function FilterBooksCategory() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');

    const handleChange = (event, newAlignment) => {
        setCategory(newAlignment);
    };

    const setCategoryFilter = (category) => {
        dispatch(filterCategory(category))
    }

    return (
        <>
            <Typography variant="h6" >Category</Typography>
            <ToggleButtonGroup
                color="primary"
                value={category}
                exclusive
                onChange={handleChange}
                aria-label="Category books"
                sx={{display:'flex', flexWrap:'wrap'}}
            >
                {
                    categories.map((buttonCategory) => {
                        const categoryId = nanoid()
                        return (
                            <ToggleButton
                                key={categoryId}
                                value={buttonCategory.value}
                                onClick={(e) => { setCategoryFilter(e.target.value) }}>
                                {buttonCategory.text}
                            </ToggleButton>
                        )
                    })
                }
            </ToggleButtonGroup>
        </>
    )
}

export default FilterBooksCategory