import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';

import SearchBooksAuthor from './search-books-author';
import SearchBooksCategory from './search-books-title';
import FilterBooksOrder from './filter-books-order';
import FilterBooksCategory from './filter-books-category';

function FilterBooks() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl fullWidth>
                    <FilterBooksCategory />
                    <FilterBooksOrder />
                    <SearchBooksAuthor />
                    <SearchBooksCategory />
                </FormControl>
            </AccordionDetails>
        </Accordion>
    )
}

export default FilterBooks