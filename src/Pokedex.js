import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './pokedex.css'

class Pokedex extends React.Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.filterCLick = this.filterCLick.bind(this);
        this.pokeTypes = [...new Set(props.pokemons.map(({ type }) => type))];
        this.state = {
            index: 0,
            allPokes: props.pokemons,
            enableButton: true,
        }
    }

    handleClick() {
        this.setState((old) => {
            let temp = old.index + 1;
            if (temp > old.allPokes.length - 1) temp = 0;
            return { index: temp }
        })
    }

    filterCLick(e) {
        this.setState(() => ({ index: 0 }));

        let filteredPokemons = [];
        if (e === 'all') {
            filteredPokemons = this.props.pokemons
        } else {
            filteredPokemons = this.props.pokemons.filter(pokemon => pokemon.type === e)
        };
        if (filteredPokemons.length === 1) {
            this.setState(() => ({ enableButton: false }));
        } else {
            this.setState(() => ({ enableButton: true }));
        }

        this.setState(() => ({ allPokes: filteredPokemons }))
    }

    render() {
        const { index, allPokes } = this.state;
        return (
            <div className="pokedex">
                <Pokemon key={ allPokes[index].id } pokemon={ allPokes[index] } />
                <div>

                    <Button>
                        <button onClick={ () => { this.filterCLick('all') } } type="sbumit">ALL</button>
                        { this.pokeTypes.map(type => <button onClick={ () => { this.filterCLick(type) } } key={ type } >{ type }</button>) }
                    </Button>

                </div>
                <button disabled={ !this.state.enableButton } onClick={ this.handleClick } type="submit">Proximo Pokemon</button>
            </div>
        );
    }
}

export default Pokedex;