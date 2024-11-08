import React from 'react'
import Table from '../molecules/table'

interface ITask {
    id: number;
    name: string;
    labels: Array<string>;
    status: string;
    created_at: string;
    updated_at: string;
    priority: string;
}

const CloseTemplate = () => {
    const data : Array<ITask> = [
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
        {
            "id": 1,
            "name": "File upload for chats",
            "labels": [
                "Update pending"
            ],
            "status": "Open",
            "created_at": "2023-11-22T13:10:13.649Z",
            "updated_at": "2023-11-22T13:10:13.649Z",
            "priority": "Urgent"
        },
    ]

    const column = [
        {
            header: "Name",
            accessor: "name" as keyof ITask
        },
        {
            header: "Labels",
            accessor: "labels" as keyof ITask,
            render: (value: ITask) => {
                return value.labels.join(", ")
            }
        },
        {
            header: "Status",
            accessor: "status" as keyof ITask
        },
        {
            header: "Created At",
            accessor: "created_at" as keyof ITask
        },
        {
            header: "Updated At",
            accessor: "updated_at" as keyof ITask 
        },
        {
            header: "Priority",
            accessor: "priority" as keyof ITask
        },
    ]

    return (
        <section className='h-full gap-3 flex flex-col'>
            <div className='h-16 w-full rounded-xl shrink-0 border border-fs-border'></div>
            <Table columns={column} data={data} />
        </section>
    )
}

export default CloseTemplate