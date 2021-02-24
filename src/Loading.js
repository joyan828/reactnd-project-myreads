import React from 'react'
import PropTypes from 'prop-types'
import LoadingImg from './icons/loading.gif'

export default function Loading ({loading}) {
    return (
        <div>
            { loading
                ? <img src={LoadingImg} alt="loading" width="150px"/>
                : <p>No books available</p> 
            }
        </div>
    )
}

Loading.propTypes = {
    loading: PropTypes.bool
}