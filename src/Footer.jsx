import React from 'react'

const Footer = ({ length }) => {

    return (
        <div>
            <p style={{
                textAlign: 'center',
                backgroundColor: 'mediumblue',
                color: 'white'
            }}>
                {length} List {length === 1 ? 'item' : 'items'}
            </p>
        </div>
    )
}

export default Footer
