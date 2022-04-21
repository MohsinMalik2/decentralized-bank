import React, { Component } from 'react'
import tetherImg from '../eth-logo.png'
import Web3 from "web3";

export default class Main extends Component {
    
     converter(wei){
        let etherValue = Web3.utils.fromWei(wei, 'ether');
       
        console.log(etherValue)
        return etherValue;
    };
  render(props) {

    
    return (
        <>
       
         <div className="card mt-5 bg-info">
                <div className="card-body">
                    <div className="row text-white">
                        <div className="col-md-12">
                            <h3>Available Balance</h3>
                        </div>
                        <div className="col-md-4">
                                <h5 className='mb-0'>Tether Balance</h5>
                                <h2>  {this.converter(this.props.tetherBalance)} USDT </h2>
                        </div>
                        <div className="col-md-4">
                                <h5 className='mb-0'> Reward Tokens</h5>
                                <h2> {this.converter(this.props.rwdBalance)} RWD </h2>
                        </div>
                        <div className="col-md-4">
                                <h5 className='mb-0'> On Stake</h5>
                                <h2> {this.converter(this.props.stakingBalance)} teth </h2>
                        </div>
                    </div>
                </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="card bg-primary mt-5">
                    <div className="card-body">
                        <form action="#">
                            <div className="form-group">
                                <label htmlFor="Amount" className="text-white"> Enter Staking Amount </label>
                                <span className='float-right text-white'> Balance:  </span>

                                <div className="input-group mb-4">
                                    <input type="number" id='Amount' className='form-control' />
                                    <div className="input-grouped-open">
                                        <div className="input-group-text form-control">
                                            <img src={tetherImg} alt="" width="30"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="text-right">
                                <button className='btn btn-success mr-2'>
                                    Deposit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card bg-warning mt-5">
                    <div className="card-body">
                        <form action="#">
                            <div className="form-group">
                                <label htmlFor="Amount" className="text-white"> Enter Staking Amount </label>
                                <span className='float-right text-white'> Balance:  </span>

                                <div className="input-group mb-4">
                                    <input type="number" id='Amount' className='form-control' />
                                    <div className="input-group-open">
                                        <div className="input-group-text form-control">
                                            <img src={tetherImg} alt="" width="30"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="text-right">
                                <button className='btn btn-danger'>
                                    Withdraw
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
        </>
       
    )
  }
}
