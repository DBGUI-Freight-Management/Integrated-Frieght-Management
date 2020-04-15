import React from 'react'

export const NavButton = props =>
    <>
        {props.mode === props.link && (
            <li className="list-group-item border-0 bg-secondary text-white">{props.link}</li>)
        }
        {props.mode !==props.link && 
            ( <li className="list-group-item border-0" onClick={()=>props.change()}>{props.link}</li>)
        }
    </>
