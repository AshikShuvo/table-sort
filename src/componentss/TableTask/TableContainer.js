import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import DataTable from './DataTable';
const flatObject=(object)=>{
    const outH=[];
    for(let key in object){
        if(typeof object[key]==='object'){
            const arr=flatObject(object[key])
            arr.forEach(item=>outH.push(item));
        }else{
            outH.push(key)
        }
    }
        return outH;
}
const flatDataObj=(object)=>{
    let obj={};
    for(let key in object){
        if(typeof object[key]==='object'){
            const anotherObject=flatDataObj(object[key]);
            obj={...obj,...anotherObject};
        }else{
            obj[key]=object[key]
        }
    }
    return obj;
}
    
const TableContainer = () => {
    const [header,setHeader]=useState([])
    const [data,setData]=useState([]);
    useEffect(() => {  
        fetchData();
    }, [])
    const fetchData=()=>{
        axios.get('https://randomuser.me/api/?results=20')
        .then(res=>{
            const location=res.data.results[0].location;
            const attr=flatObject(location);
            setHeader(prevHeader=>{
                return [...attr];
            });
            const dataArr=res.data.results.map(obj=>{
                return flatDataObj(obj.location)
            })
            setData([...dataArr]);

        })
        .catch(err=>{
            console.log(err)
        })
    }
    const sorter=(name)=>{
        const dat=data;
        dat.sort((a,b)=>{
            if(typeof a[name]==='string'){
                console.log('local compare')
                return a[name].localeCompare(b[name])
            }
            return a[name]-b[name]
        })
        console.log(name)
        setData([...dat]);
    }
    return (
        <div>
            <h2>Table Container</h2>
            <DataTable header={header} data={data} sorter={sorter}/>
        </div>
    )
}

export default TableContainer
