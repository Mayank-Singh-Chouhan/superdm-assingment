export interface ITask {
    id: number;
    name: string;
    labels: Array<string>;
    status: string;
    created_at: string;
    updated_at: string;
    priority: string;
}