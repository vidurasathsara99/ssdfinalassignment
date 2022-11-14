import React from "react";
export default function AddNewUserCsvHtml(onClickAddCsv){
    return <React.Fragment>
        <table>
            <thead>
            <tr key={0}>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr key={1}>
                <td colSpan="3" className="text-center"><h6>Add New Users</h6></td>
            </tr>
            <tr className="border border-secondary rounded" key={2}>
                <td>&nbsp;<label>Add CSV</label></td>
                <td><input type="file" id={"users_file"}/></td>
                <td className="p-3">
                    <button className="btn btn-success" onClick={()=>onClickAddCsv('users_file')}>↑</button>
                </td>
            </tr>
            <tr key={3}>
                <td colSpan="3"><a href="add-user-template.csv" download>Click me to get CSV Template</a></td>
            </tr>
            <tr key={4}>
                <td colSpan="3" className="text-center">Server Generated Result</td>
            </tr>
            <tr className="border border-secondary rounded" key={5}>
                <td>&nbsp;<label>Processed CSV</label></td>
                <td>
                    <div className="border border-success rounded" style={{width: "150px"}}>
                        Waiting for Upload...
                    </div>
                </td>
                <td className="p-3">
                    <button className="btn btn-warning" disabled>↓</button>
                </td>
            </tr>
            </tbody>
        </table>
        <span> Always use template to add new accounts</span>
    </React.Fragment>;
}