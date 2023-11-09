import React from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import { setArr } from "../redux/action";
import { bindActionCreators } from "redux";
// import {loadBucket, createBucket} from 'redux/modules/bucket'

class pokenmonList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokenmonList:[],        // 포켓몬 리스트
            scrollStart:1,              // 처음에 나오는 갯수의 시작을 위함
            scrollCnt:10,             // 처음에 나오는 갯수
            isScroll:false,             // 처음에는 스크롤 안하도록
            searchTxt:0,               // 검색 기능

            pokenmonList_orgin:[],      // 포켓몬 리스트(기존) 검색기능을 위함

            no_list_info:false,         // 검색했을때 해당 정보가 없는 경우를 위함
        }

    }


    componentWillMount = async() => {
        this.getPokenList();
    }

    componentDidMount = async() => {
        window.addEventListener('scroll', this.handleScroll, true);
        return () => {
              window.removeEventListener("scroll", this.handleScroll);
            };
    }

    handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if(scrollTop+clientHeight === scrollHeight){
            this.setState({
                scrollStart:this.state.scrollCnt,
                scrollCnt:this.state.scrollCnt+20
            },() => {this.getPokenList()})
        }
    }

    getPokenList = async() => {

        const {scrollCnt, scrollStart} = this.state;
        let list = this.state.pokenmonList;
            for(var j=scrollStart; j<scrollCnt; j++){
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${j}`).then(async(res) => {
                await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${j}`).then(res2 => {
                const ko = res2.data.names.find(name => name.language.name === 'ko');
                list.push({...res.data, korean_name:ko.name});

            })})
            }
        this.setState({pokenmonList:list})
    }

    filterList = () => {
        const {searchTxt, pokenmonList} = this.state;
        console.log(this.state.pokenmonList_orgin);

        if(searchTxt === '') {this.setState({pokenmonList:this.state.pokenmonList_orgin})}

        else {
            const filtered = pokenmonList.filter((item) => {
                if(item.id+"".trim() === searchTxt+"".trim()) {
                    return item
                }
            })
            this.setState({pokenmonList:filtered, no_list_info:true})
        }
    }


    addReduxData = (item) => {
        this.props.setArr(this.state.pokenmonList);
        this.onDetailScreen(item);

    }

    onDetailScreen = (item) => {
        window.location="/detailPokenmon?id="+item.id
    }


    render() {
        const {pokenmonList, searchTxt, no_list_info} = this.state;

        let list = pokenmonList;

		return (
		    <div style={{}}>
                <h3 style={{}}>포켓몬 도감</h3>
                <input placeholder="포켓몬 번호를 검색해보세요" onChange={(e)=>{this.setState({searchTxt:e.target.value})}}></input>
                <button onClick={()=>{this.filterList()}}>검색</button>
                <div>
                    {pokenmonList.map((item, key) => {
                        return (
                            <div style={{border:'1px solid #ddd', margin:10, padding:10,}} onClick={() => {this.addReduxData(item)}}>
                                <img src={item.sprites.front_default}></img>
                                <p>{item.korean_name} </p>
                                <p>ID : {item.id}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {pokenmonList.length === 0 && no_list_info &&
                        <p>검색하신 데이터가 없습니다. 검색어를 초기화한 후 스크롤을 내려 전체 데이터에서 한번 더 검색해주세요.</p>
                    }
                </div>

            </div>

		);
  }

}
const mapStateToProps = (state) => ({
    arrData:state.pokenmonList
  });

// 액션을 컴포넌트 props에 매핑
const mapDispatchToProps = (dispatch) => {
return {
    setArr_test:(arr)=>dispatch({type:'SET_ARR'})
}
};
export default connect(null, {setArr})(pokenmonList)