import { ITask } from "@/models/interfaces";

export const OPEN_TASK_DATA: Array<ITask> = [
    {
        id: 783291,
        name: "Update API Documentation",
        labels: ["Feature request", "Backend"],
        status: "Open",
        created_at: "2024-04-05T16:00:00.000Z",
        updated_at: "2024-04-10T18:30:00.000Z",
        priority: "Medium"
    },
    {
        id: 462915,
        name: "Fix Login Bug",
        labels: ["Bug fix", "Critical"],
        status: "Open",
        created_at: "2024-01-20T12:15:00.000Z",
        updated_at: "2024-01-25T14:50:00.000Z",
        priority: "High"
    },
    {
        id: 290184,
        name: "Improve Dashboard UI",
        labels: ["UI", "Enhancement"],
        status: "Open",
        created_at: "2024-02-10T09:00:00.000Z",
        updated_at: "2024-03-01T10:00:00.000Z",
        priority: "Medium"
    },
    {
        id: 574392,
        name: "Integrate Payment Gateway",
        labels: ["Feature request", "Backend"],
        status: "Open",
        created_at: "2024-03-15T11:45:00.000Z",
        updated_at: "2024-03-20T08:30:00.000Z",
        priority: "Urgent"
    }
];