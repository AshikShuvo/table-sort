import React from 'react'

const DataTable = ({header,data,sorter}) => {
    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                {header.map(item=><th scope="col" onClick={()=>sorter(item)}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(obj=>{
                    let dat=[];
                    for(let i in obj){
                        dat.push(obj[i])
                    }
                return (<tr>
                    {
                       dat.map(item=><td>{item}</td>)
                    }
                </tr>)
            })}
            </tbody>
            </table>
        </div>
    )
}

export default DataTable
