import { Sprint } from "./sprint.type";

export type CreateSprintForProjectRequest = Omit<Sprint, 'id' | 'project_id'>;