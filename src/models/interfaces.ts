export interface ITask {
    id: number;
    name: string;
    labels: Array<string>;
    status: string;
    created_at: string;
    updated_at: string;
    priority: string;
}

export interface ITaskComment {
    task_id: number,
    content: string;
    name_of_sender: string;
}