export default function ProductDetail(){
    return (
    <main className="flex flex-col self-center h-screen">
        <div className="self-center">
            <h1>Details</h1>
            <div className="flex flex-col justify-center items-center">
                <img src="/images/product.png" alt="product" />
                <h3>Crostini</h3>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row justify-between items-center gap-5 mr-9">
                    <button> - </button>
                    <p>02</p>
                    <button> + </button>
                   </div>
                   <p >$ 5.8</p>
                </div>
            </div>

        </div>
        <div className="flex flex-col self-center max-w-[500px] px-4">
            <h3>Description</h3>
            <p className="text-justify">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Pasta is a versatile Italian staple made 
                from wheat flour and water. It comes in many shapes, 
                is typically boiled, and pairs with various sauces like marinara or pesto.
                 Quick to prepare, pasta offers a satisfying 
                 source of carbohydrates and is enjoyed globally in countless dishes.
            </p>

        </div>
        <button className="self-center bg-orange-400 py-4 w-[10rem] mt-10 rounded-[15px]">Add to cart</button>

    </main>
    ) 
}