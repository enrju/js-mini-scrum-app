import { Controller, Get } from "@nestjs/common";
import { pool } from "../utils/db";

@Controller('/api/v2/projects')
export class ProjectsController {
  @Get('/')
  async getAll() {
    const [results] = await pool.execute('SELECT * FROM `projects`');
    return results;
  }
}
