import { Sprint } from "./sprint.type";

export type CreateSprintForProjectRequest = Omit<Sprint, 'id' | 'project_id'>;

export type UpdateSprintRequest = Omit<Sprint, 'id' | 'project_id'>;