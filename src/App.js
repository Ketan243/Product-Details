import './App.css';

import Colors from './components/Colors'
import DetailsThumb from './components/DetailsThumb';
import React from 'react';

class App extends React.Component{

  state = {
    quantity: 1,
    products: [
      {
        "_id": "1",
        "title": "Random Stuff",
        "src": [
            "https://dev.nazdik.in/api/product/show?1=1",
            "https://picsum.photos/1200",
            "https://picsum.photos/1450",
            "https://picsum.photos/1300"
          ],
        "description": "Pre-order new apparel for the upcoming season. We're currently out of stock, but we're working hard to get back in stock soon.",
        "content": "Welcome to our website feel free to browse our products and see what we have in stock. We're currently out of stock, but we're working hard to get back in stock soon.",
        "price": 23,
        "colors":["red","black","crimson","teal"],
        "count": 1
      }
    ],
    index: 0
  };

  myRef = React.createRef();

  handleTab = index =>{
    this.setState({index: index})
    const images = this.myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount(){
    const {index} = this.state;
    this.myRef.current.children[index].className = "active";
  }


  render(){
    const {products, index,quantity} = this.state;
    return(
      <div className="app">
        {
          products.map(item =>(
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.src[index]} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>${item.price}</span>
                </div>
                <Colors colors={item.colors} />

                <p>{item.description}</p>
                <p>{item.content}</p>

                <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                <div className="quant">
                  <button className="add" onClick={()=>this.setState({quantity:quantity+1})}>+</button>
                  <span className="quantity">{this.state.quantity}</span>
                  <button className="remove" onClick={()=>quantity?this.setState({quantity:quantity-1}):0}>-</button>
                  <button className="cart">Add to cart</button>

                </div>
                
              </div>
            </div>
          ))
        }
      </div>
    );
  };
}

export default App;
