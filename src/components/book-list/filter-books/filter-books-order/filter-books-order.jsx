import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { setOrder } from "../../../../store/bookSlice";
import { useDispatch } from "react-redux";

function FilterBooksOrder() {
    const dispatch = useDispatch();
    const [orderBy, setOrderBy] = useState('newest');

    const handleChange = (event, newAlignment) => {
        setOrderBy(newAlignment);
    };

    const setOrderFilter = (order) => {
        dispatch(setOrder(order))
    }

    return (
        <>
            <Typography variant="h6" >Sort By</Typography>
            <ToggleButtonGroup
                color="primary"
                value={orderBy}
                exclusive
                onChange={handleChange}
                aria-label="Order books"
            >
                <ToggleButton
                    value="newest"
                    onClick={(e) => { setOrderFilter(e.target.value) }}>
                    New
                </ToggleButton>
                <ToggleButton
                    value="relevance"
                    onClick={(e) => { setOrderFilter(e.target.value) }}>
                    Relevance
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default FilterBooksOrder;