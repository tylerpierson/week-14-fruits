const React = require('react')

function Show(props){
    return(
        <div>
            <h1>{props.fruit.name}</h1>
            <a href="/fruits">Go back to Index Page</a>
            <p>
                The {props.fruit.name} is {props.fruit.color} and {props.fruit.readyToEat? 'it is ready to eat': 'it is not ready to eat.'}
            </p>
            <form action={`/fruits/${props.fruit._id}?_method=DELETE`} method="POST">
                <input type="submit" value={`Delete this ${props.fruit.name}`} />
            </form>
            <div>
                <a href={`/fruits/${props.fruit._id}/edit`}><button>{`Edit this ${props.fruit.name}`}</button></a>
            </div>
        </div>
    )
}

module.exports = Show