const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


require("chai")
.use(require('chai-as-promised'))
.should()

contract('DecentralBank',(accounts) => {
    //All the code will go here for testing

    let tether, rwd

    //In test Before function apply before everything else
    
    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
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


})