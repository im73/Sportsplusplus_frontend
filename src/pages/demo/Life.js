import React from 'react'
import Child from'./Child'
import {Button} from "antd";

export default class Life extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            count:0
        }

    }
    handleadd()
    {
        this.setState(
            {count:this.state.count+1}
        )
    }
    render() {
        return <div>
            <p>React</p>
            <Button onClick={this.handleadd.bind(this)}>点击</Button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}>

            </Child>
        </div>
    }
}

