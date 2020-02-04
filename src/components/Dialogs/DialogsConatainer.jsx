import React from 'react';

export default class Dilogs extends React.Component {
    componentDidMount = () => {
        fetch(`https://animals-chat.herokuapp.com/rooms`, {
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODA4OTUwODR9.8eQP1oSLAF7B0QKERYme_zd198mnLfrPNkCczP7HXTg"
            }}).then(res => res.json()).then(rooms => console.log({rooms}));
      };
    render () {
        return (
            <div>
                <h1>Halo</h1>
            </div>
        )
    }
}