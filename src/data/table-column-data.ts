import { ITask } from "@/models/interfaces"

export const TASK_COLUMN = [
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