import React from 'react';
import '../pages/calculatorPage.css'


class Calculator extends React.Component {
    
    
    state = {
        assetName: '',
        assetAmount: 0,
        assetArray: [],
        liabilityName: '',
        liabilityAmount: "",
        liabilityArray: [],
        TotalAsset:0,
        TotalLiability:0,
        networth: 0,
        Asset:0,
        liability:0,
        isAssetClick:false,
        isliabilityClick:false
    }

    TotalAsset=()=> {
        
        let {assetArray,TotalAsset}=this.state;
        for(let i=0;i<assetArray.length;i++) {
            TotalAsset = TotalAsset + assetArray[i].assetAmount;
            this.setState({TotalAsset})
            
            
        }
        this.setState({Asset:TotalAsset})
        console.log(this.state.Asset)
        this.setState({isAssetClick:true})
        

    }
    networth=(A,l)=> {
        this.setState({networth:A - l})
        this.setState({isAssetClick:false})
        this.setState({isliabilityClick:false})
        this.setState({liabilityArray:[]})
        this.setState({assetArray:[]})
        this.setState({TotalAsset:0})
        this.setState({TotalLiability:0})
        
    }
    

    TotalLiability=()=> {
        let {liabilityArray,TotalLiability}=this.state;
        for(let i=0;i<liabilityArray.length;i++) {
            TotalLiability = TotalLiability + liabilityArray[i].liabilityAmount;
            this.setState({TotalLiability})
            
            

        }
        this.setState({liability:TotalLiability})
        this.setState({isliabilityClick:true})
        console.log(TotalLiability);
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onLiabilityAdd = () => {
        const {liabilityAmount, liabilityName} = this.state;
        if(!liabilityAmount.trim() || !liabilityName.trim()) return;
        this.setState(state => ({
            liabilityArray: [
                ...state.liabilityArray,
                {
                    liabilityName: state.liabilityName,
                    liabilityAmount: Number(state.liabilityAmount)
                }

            ]
        }))
        
    }

    onAssetAdd = () => {
        const {assetAmount, assetName} = this.state;
        if(!assetAmount.trim() || !assetName.trim()) return;
        this.setState(state => ({
            assetArray: [
                ...state.assetArray,
                {
                    assetName: state.assetName,
                    assetAmount: Number(state.assetAmount)
                }

            ]
        }))
        
        
    }
        // this.setState(state => ({
            // assetArray: state.assetArray.concat([{
            //     assetName: state.assetName,
            //     assetAmount: state.assetAmount
            // }])
        // }));
    render() {
        
        return (
            <div className='content'>
                <h1 style={{textAlign:'center'}}>Melinoe Net-worth Calculator</h1>
                <h2 style={{textAlign:'center'}}>Your Net-worth is &#8358;{this.state.networth} for now</h2>
                <div className="ui stackable two column divided grid container" style={{transform: 'translate(-41%,-12em)'}} id='main'>
                    
                    <div className="row">
                        <div className="column">
                        <h1>Assets</h1>
                            <div className="ui segment">
                                <div className="ui form">
                                    <div className="three fields">
                                        <div className="eight wide field">
                                            <label>Asset Name</label>
                                            <input type="text" name='assetName' placeholder="Asset Name" onChange={this.inputHandler} />
                                        </div>
                                        <div className="five wide field">
                                            <label>Amount(in Naira)</label>
                                            <input type="number" name='assetAmount' placeholder="Asset Amount" onChange={this.inputHandler} />
                                        </div>
                                        <button className='ui primary button' onClick={this.onAssetAdd}>+Add</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="column">
                            <h1>Liabilities</h1>
                            <div className="ui segment">
                                <div className="ui form">
                                    <div className="three fields">
                                        <div className="eight wide field">
                                            <label>Liability Name</label>
                                            <input type="text" name='liabilityName' placeholder="Liability Name" onChange={this.inputHandler} />
                                        </div>
                                        <div className="five wide field">
                                            <label>Amount(in Naira)</label>
                                            <input type="number" name='liabilityAmount' placeholder="Liability Amount" onChange={this.inputHandler} />
                                        </div>
                                        <button className='ui primary button' onClick={this.onLiabilityAdd}>+Add</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            
                            <div className="ui segment">
                                <table className="ui celled table">
                                    <thead>
                                        <tr><th>Asset Name</th>
                                            <th>Amount</th>
                                        </tr></thead>
                                    <tbody>
                                        {this.state.assetArray.map((asset, i) => <tr key={i}>
                                            <td>{asset.assetName}</td>
                                            <td>{asset.assetAmount}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                            <button className='ui primary button' onClick={this.TotalAsset} style={{marginRight:'20px'}} disabled={this.state.isAssetClick}>Generate Total Amount of Assets</button>
                            <span style={{fontSize:'20px'}} ref={a=>this._inputElement=a}>&#8358;{this.state.TotalAsset}</span>

                        </div>
                        <div className="column">
                            <div className="ui segment">
                                <table className="ui celled table">
                                    <thead>
                                        <tr><th>Liability Name</th>
                                            <th>Amount</th>
                                        </tr></thead>
                                    <tbody>
                                    {
                                        this.state.liabilityArray.map((liability, i) => <tr key={i}>
                                            <td>{liability.liabilityName}</td>
                                            <td>{liability.liabilityAmount}</td>
                                        </tr>)
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <button className='ui primary button' onClick={this.TotalLiability} style={{marginRight:'20px'}} disabled={this.state.isliabilityClick}>Generate Total Amount of Liabilities</button>
                            <span style={{fontSize:'20px'}}>&#8358;{this.state.TotalLiability}</span>
                        </div>
                    </div>
                    <div className='Total'>
                        <h4>Note: Total net-worth = Total Amount of Assets - Total Amount of Liabilities</h4>
                        <button className='massive ui primary button' type='submit' onClick={()=>this.networth(this.state.Asset,this.state.liability)} disabled={this.state.isliabilityClick && this.state.isAssetClick ? false : true}>Calculate the Total Net-worth</button>
                    </div>
                </div>
                
                
            </div>
        )

}
}


export default Calculator;