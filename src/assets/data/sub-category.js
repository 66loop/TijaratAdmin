import React from 'react'
import jwel18 from '../images/dashboard/product/11.jpg';
import pro06 from '../images/dashboard/product/4.jpg';
import pro9 from '../images/dashboard/product/3.jpg';

const data = [
    
    {
        image: <img src={pro06} style={{width:50,height:50}} />,
        product_name: "Woman one pis",
        price: "$682.00",
        status: <i className="fa fa-circle font-danger f-12" />,
        category: "clothes"
    },
    {
        image: <img src={pro9} style={{width:50,height:50}} />,
        product_name: "Mouse",
        price: "$24.00",
        status:<i className="fa fa-circle font-danger f-12" /> ,
        category: "electronics"
    },
    {
        image: <img src={jwel18} style={{width:50,height:50}} />,
        product_name:"Diamond Ring",
        price: "$3579.00",
        status:<i className="fa fa-circle font-danger f-12" />,
        category: "Jewellery"
    }
  
]

export default data;
