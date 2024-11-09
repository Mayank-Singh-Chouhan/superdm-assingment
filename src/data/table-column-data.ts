import { formatDateString } from "@/lib/utils"
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
        accessor: "created_at" as keyof ITask,
        render: (value: ITask) => {
            return formatDateString(value.created_at)
        }
    },
    {
        header: "Updated At",
        accessor: "updated_at" as keyof ITask,
        render: (value: ITask) => {
            return formatDateString(value.updated_at)
        }
    },
    {
        header: "Priority",
        accessor: "priority" as keyof ITask
    },
]