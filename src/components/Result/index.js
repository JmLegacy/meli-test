import React, { Component } from 'react';
import Search from '../../elements/Search';
import ResultList from '../../elements/ResultList';
import { searchProducts } from '../../Service/Meli.js';
import './style.css';

export default class Result extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  constructor(props) {
      
        super(props)
        
        this.state = { search:'', items: [] }

        this.MeliSearch = this.MeliSearch.bind(this);

        this.props.history.listen((location, action) => {
            var param = location.search.replace('?search=','');
            this.MeliSearch(param);
        });
        
    }

    componentDidMount(){
        var param = this.props.location.search.replace('?search=','');
        this.MeliSearch(param);
    }

    componentDidUpdate(){
       this.render();
    }

    MeliSearch(param){
        var _that = this;

        searchProducts(param).then((res) => {
            _that.setState({items:res});
            _that.render();
        });

        
    }

  render() {
    const { className, ...props } = this.props;
    return (
    <div> 
      <Search history={this.props.history} />
      <ResultList result={this.state.items} />
    </div>
    );
  }
}