import { ITask } from "@/models/interfaces";

export const CLOSED_TASK_DATA: Array<ITask> = [
    {
        id: 1,
        name: "Complete User Authentication",
        labels: ["Feature request", "Backend"],
        status: "Closed",
        created_at: "2024-04-05T16:00:00.000Z",
        updated_at: "2024-04-10T18:30:00.000Z",
        priority: "Medium"
    },
    {
        id: 2,
        name: "Resolve Payment Issue",
        labels: ["Bug fix", "Critical"],
        status: "Closed",
        created_at: "2024-01-20T12:15:00.000Z",
        updated_at: "2024-01-25T14:50:00.000Z",
        priority: "High"
    },
    {
        id: 3,
        name: "Redesign Landing Page",
        labels: ["UI", "Enhancement"],
        status: "Closed",
        created_at: "2024-02-10T09:00:00.000Z",
        updated_at: "2024-03-01T10:00:00.000Z",
        priority: "Medium"
    },
    {
        id: 4,
        name: "Setup Continuous Integration",
        labels: ["Feature request", "Backend"],
        status: "Closed",
        created_at: "2024-03-15T11:45:00.000Z",
        updated_at: "2024-03-20T08:30:00.000Z",
        priority: "Urgent"
    }
];
