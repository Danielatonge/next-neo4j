import React from 'react'
import MapResults from 'component/dashboard/MapResults'

// page layout
import MainLayout from 'layout/MainLayout';

function Search() {

    return <MapResults />
}

export default Search

Search.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}