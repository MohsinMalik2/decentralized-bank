const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


require("chai")
.use(require('chai-as-promised'))
.should()


//accounts array can be factorized by giving every index a name to make the code easy to understand and readable
// contract('DecentralBank',(accounts) => {
contract('DecentralBank',([owner, customer]) => {
    //All the code will go here for testing

    let tether, rwd, dBank;
    function converter(number){
        return web3.utils.toWei(number , 'ether')
    }
    //In test Before function apply before everything else
    
    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
        dBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer all tokens to decentral bank

        await rwd.transferTo(dBank.address , converter('1000000'))

        //transfer 100 mock tokens to customer accounts

        // await tether.transferTo(accounts[1],converter('100'),{from: accounts[0]}); old way when use array name
        await tether.transferTo(customer,converter('100'),{from: owner});  // new way when use index names
    })  

    // 1st test to check the name of the tether token (assertion)

    describe("Mock Tether Test", async () => {

        it("Names Matches Successfully", async () => {
            
            const name =  await tether.name();

            assert.equal(name , 'Moch Tether Token')   //Main Logic of the test (name is equal to Moch Tether Token)
        })
    })

    // 2nd test to check the name of the Reward token (assertion)

    describe("Reward Token Test", async () => {

        it("RWD Matches Successfully", async () => {
            const name =  await rwd.name();

            assert.equal(name , 'Reward Token')    //Main Logic of the test
        })
    })

    // 3rd test to check the amount of the Reward tokens inside decentral bank (assertion)


    describe("Reward Token Amount Test", async () => {
        
        
        it("DBank Name Test", async () => {
            const name =  await dBank.name();

            assert.equal(name , 'Decentral Bank')    
        })


        it("DBank Has Tokens", async () => {
            let balance = await rwd.balanceOf(dBank.address);

            assert.equal(balance , converter('1000000'))   
        })

       
    })


    describe("Yield Farming Test", async () => {
        
        it("Balance Testing", async () => {

            //CHeck balance of investors
            let result;

            result = await tether.balanceOf(customer);

            assert.equal(result.toString() , converter('100'),'Customer mock wallet balance before staking') 
            
            //CHeck balance of Bank
                        
            let decentralBankBalance;

            decentralBankBalance = await tether.balanceOf(dBank.address);

            assert.equal(decentralBankBalance.toString() , converter('0'),'Decentral Bank balance before staking') 
        })

        it("Deposit Token Testing", async () => {

            //Check whether deposit Tokens function is running or not
            
            // depositing 50eth from customer to decentral bank

            //deposit approval
            await tether.approve(dBank.address,converter('100'),{from:customer});
            //deposit function
            await dBank.depositTokens(converter('100'),{from:customer});

            //CHeck updated balance of investors

            let result;

            result = await tether.balanceOf(customer);

            assert.equal(result.toString() , converter('0'),'Customer mock wallet balance after staking') 

             //CHeck updated balance of Bank
            
             let decentralBankBalance;

             decentralBankBalance = await tether.balanceOf(dBank.address);
 
             assert.equal(decentralBankBalance.toString() , converter('100'),'Decentral Bank balance after staking') 

               //Check is Staking value of customemr
            
               let is_staking;

               is_staking = await dBank.isStaking(customer);
   
               assert.equal(is_staking.toString() ,'true','Customer is Staking') ;

            //Testing the issue token function
            await dBank.issueTokens({from:owner}) //Owner because only he can call this function

            await dBank.issueTokens({from:customer}).should.be.rejected; //Owner because only he can call this function

           

        })

        it("Unstaking Token Testing", async () => {
            await dBank.withdrawTokens({from:customer});  //Checking withdraw function working or not

              //CHeck balance of investors
              let result;

              result = await tether.balanceOf(customer);
  
              assert.equal(result.toString() , converter('100'),'Customer mock wallet balance after unstaking') 
              

                //Update is Staking value of customer
            
                let is_staking;

                is_staking = await dBank.isStaking(customer);
    
                assert.equal(is_staking.toString() ,'false','Customer is Staking') ;


              //CHeck balance of Bank
                          
              let decentralBankBalance;
  
              decentralBankBalance = await tether.balanceOf(dBank.address);
  
              assert.equal(decentralBankBalance.toString() , converter('0'),'Decentral Bank balance after unstaking') 
        });
    })
  

})