import React from "react";
import "./DataTable.css";

function DataTable({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No records found.",
    rowKey="id",
    className = ""
}) 
{

    if(loading) {

        return (

            <div className="datatable-loading">Loading...</div>

        );
    }

    if(!data.length) {
        
        return (

            <div className="datatable-empty"> {emptyMessage} </div>

        );

    }

    return (

        <div className={`datatable-wrapper ${className}`}>

            <table className="datatable">

                <thead>

                    <tr>

                        {columns.map(column => (
                            
                            <th key={column.header}>{column.header}</th>
                        ))}

                    </tr>

                </thead>    

                <tbody>

                        {data.map((row, index) => (
                            <tr key={row[rowKey] ?? index}>

                                {columns.map(column => (

                                   <td key={column.header || column.accessor}>
                                        {column.render ? column.render(row) : row[column.accessor]}
                                    </td>
                                ))}

                            </tr>
                        ))}

                </tbody>

            </table>       

        </div>

    )

}

export default React.memo(DataTable);