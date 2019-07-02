import {combineReducers} from 'redux'


const init = {
    id : '',
    username : '',
    myCart : [],
    totalPrice : 0,
    totalUnit : 0
}

const AuthReducer = (data = init , action) => {
    switch (action.type){
        case "LOGIN_SUCCESS":
            return{
                ...data,
                id : action.payload.id,
                username : action.payload.username
            }
           
        case "LOGOUT_SUCCESS":
            return{
                ...data,
                id : '',
                username : '',
                
            }
            case "ADD_TO_CART":
            let moreThanOne = data.myCart.find( data => data.id === action.payload.lastSelectedID );
            console.log('%c moreThanOne', 'color:orange; font-weight:bold;');
            console.log(moreThanOne);

            if(moreThanOne) {
                
                var addedItemQuantity = action.payload.singleItemToCart.quantity
                for(var i = 0; i<data.myCart.length; i++){
                    if(data.myCart[i].id === action.payload.lastSelectedID){
                        data.myCart[i].quantity = data.myCart[i].quantity + addedItemQuantity
                    }
                }

               return {
                   ...data,
                   totalUnit : data.totalUnit + addedItemQuantity,
                   totalPrice: data.totalPrice + parseInt(moreThanOne.price),
               }
            } else {

                return{
                    ...data,
                    myCart: [...data.myCart, action.payload.singleItemToCart],
                    totalPrice: data.totalPrice + action.payload.totalPrice,
                    totalUnit : data.totalUnit + action.payload.singleItemToCart.quantity
                }

            }
        default:
            return data
    }
}

export default combineReducers(
    {
        auth : AuthReducer 
    }
)