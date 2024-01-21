import React from 'react'

const Header = (props) => {
    return (
        <div>
            <header style={{
                backgroundColor: 'mediumblue',
                color: 'white',
                textAlign: 'center',
            }}>
                <h1>
                    {props.title}
                </h1>
            </header>

        </div>
    )
}

export default Header
