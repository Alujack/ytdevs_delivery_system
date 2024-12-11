const OrderCart = () =>{
    return (<>
    <div className="flex flex-col items-center h-screen">
        <h1 className="font-bold mt-5">Your Order</h1>
        <div className="flex flex-col mt-10 w-[400px]">
            <div className="flex flex-row justify-between border-2 border-gray-500 p-2 rounded-lg w-[100%] my-5">
                <img src="/images/product-order.png" alt=" product-order"/>
                <div className="flex flex-row justify-between items-center gap-5 mr-9 ">
                    <h3>Crostini</h3>
                    <button> - </button>
                    <p>02</p>
                    <button> + </button> 
                    <p >$ 5.8</p>
                   </div>
                  
                
            </div>
            <div className="flex flex-row justify-between border-2 border-gray-500 p-2 rounded-lg w-[100%]  my-5">
                <img src="/images/product-order.png" alt=" product-order"/>
                <div className="flex flex-row justify-between items-center gap-5 mr-9 ">
                    <h3>Crostini</h3>
                    <button> - </button>
                    <p>02</p>
                    <button> + </button> 
                    <p >$ 5.8</p>
                   </div>
                  
                
            </div>
            <div className="flex flex-row justify-between border-2 border-gray-500 p-2 rounded-lg w-[100%]  my-5">
                <img src="/images/product-order.png" alt=" product-order"/>
                <div className="flex flex-row justify-between items-center gap-5 mr-9 ">
                    <h3>Crostini</h3>
                    <button> - </button>
                    <p>02</p>
                    <button> + </button> 
                    <p >$ 5.8</p>
                   </div>
                  
                
            </div>

        </div>


    </div>
    </>)
}
export default OrderCart;