import React from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import { setSearchTerm } from "../redux/action";
import { bindActionCreators } from "redux";
class detailPokenmon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detailInfo:[]
        }

    }


    componentWillMount = async() => {
        const url = window.location.search;
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${url.split("=")[1]}`).then(async(res) => {
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${url.split("=")[1]}`).then(async res2 => {
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.name}/`).then(async res3 => {
            await axios.get(`${res3.data.evolution_chain.url}`).then(res4 => {
            const ko = res2.data.names.find(name => name.language.name === 'ko');

            let info = [];
            const evolution = res4.data.chain.evolves_to[0].evolves_to[0].species.name;

            info.push({...res.data, korean_name:ko.name, evolution:evolution});

            this.setState({detailInfo:info})

            })})
        })})
    }

    componentDidMount = async() => {

    }







    render() {
        const {detailInfo} = this.state;
		return (
		    <div style={{}}>

                {detailInfo.map((item, key) => {
                    return (
                        <>
                        <h3>{item.korean_name} 상세 정보</h3>
                        <img src={item.sprites.front_default} alt={item.korean_name}></img>
                        <p>키 :{item.height}</p>
                        <p>몸무게 : {item.weight}</p>

                        <p>{item.name === item.evolution ? '최종진화완료' : '최종진화는 '+item.evolution+' 으로 진화예정'}</p>
                        <p>능력</p>
                        {item.abilities.map((item2, key2) => {
                            return (
                                <p>{key2+1} : {item2.ability.name}</p>
                            )

                        })}
                        </>
                    )

                })}


            </div>

		);
  }

}
const mapStateToProps = (state) => ({
    pokenmon_list: state.data
  });

export default connect(mapStateToProps)(detailPokenmon)