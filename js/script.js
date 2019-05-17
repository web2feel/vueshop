var products = new Vue({
    el:"#store",
    data:{
        products:[
            {
                id:1,
                name:"Product one",
                price:35,
                image:"prod001.jpg"
            },
            {
                id:2,
                name:"Product two",
                price:40,
                image:"prod002.jpg"
            },  
            {
                id:3,
                name:"Product three",
                price:60,
                image:"prod003.jpg"
            },
            {
                id:4,
                name:"Product four",
                price:30,
                image:"prod004.jpg"
            },
            {
                id:5,
                name:"Product five",
                price:55,
                image:"prod005.jpg"
            },
            {
                id:6,
                name:"Product six",
                price:45,
                image:"prod006.jpg"
            }
        ],
        cartitems:[],
        taxPercent:10,
        coupon:'',
        currency:"$",
        subTotal:0,
        taxTotal:0,
        totalFinal:0,
        discountedTotal:0
    },
    methods:{
        addToCart:function(product){
            let dupe = false
            for(let i = 0; i < this.cartitems.length; i++){
                if(this.cartitems[i].id === product.id){
                    let newCartItem = this.cartitems[i]
                    newCartItem.quantity = newCartItem.quantity + 1                    
                    dupe = true
                }
            }      
            if(!dupe){
                this.cartitems.push(
                    {
                        id:product.id, 
                        name:product.name, 
                        price:product.price, 
                        image:product.image, 
                        quantity:1
                    })
            }
            this.subTotal += product.price
            this.computeTotal()
            this.applyCoupon()
        },
        applyCoupon:function(){
            if(this.coupon === 'BINGO'){
                this.discountedTotal = this.totalFinal * 0.5
            } else {
                this.discountedTotal = 0
            }
        },
        clearCart:function(){
            this.cartitems = [],
            this.subTotal = 0,
            this.coupon = ''
        },
        updateTotal :function(cartitem){
            if(cartitem.quantity === 0){
                let index = this.cartitems.findIndex(cart => cart.id === cartitem.id)
                this.cartitems.splice(index, 1);                
            }
            let newtotal = 0
            for(let i = 0; i < this.cartitems.length; i++){
                newtotal += this.cartitems[i].price * this.cartitems[i].quantity                
            }
            this.subTotal = newtotal
            this.computeTotal()
            this.applyCoupon()
        },
        computeTotal:function(){
            this.taxTotal = this.subTotal * this.taxPercent / 100
            this.totalFinal = this.subTotal + this.taxTotal
        }
    }
})