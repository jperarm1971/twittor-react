import React from 'react';
import BasicLayout from "../../layouts/BasicLayout";

export default function Users(props) {
    console.log(props);
    const {setRefreshCheckLogin}=props;
    return (
        <BasicLayout title="Usuarios" classname="users" setRefreshCheckLogin={setRefreshCheckLogin}>
        <div>
            <h2>estamos en Users</h2>
        </div>
        </BasicLayout>
    )
}
